import { prisma } from './prisma';

function sortMapByValue(map: Map<string, number>) {
  // Convert the object to an array of key-value pairs
  const dictArray = Object.entries(map);

  // Sort the array by value
  dictArray.sort((a, b) => b[1] - a[1]);

  // Convert the array back to an object
  const sortedMap: typeof map = new Map();
  for (const [key, value] of dictArray) {
    sortedMap.set(key, value);
  }

  return sortedMap;
}

function generateTierlistForMinPlayCount(
  minPlayCount: number,
  deckCountForCommander: Map<string, number>,
  top16CountForCommander: Map<string, number>,
  avgAttendentsForCommander: Map<string, number>,
  imageForCommander: Map<string, string>
) {
  deckCountForCommander = sortMapByValue(new Map(deckCountForCommander));
  top16CountForCommander = new Map(top16CountForCommander);
  avgAttendentsForCommander = new Map(avgAttendentsForCommander);

  let top16RatioForCommander = new Map<string, number>();
  for (const commander of Array.from(deckCountForCommander.keys())) {
    if (deckCountForCommander.get(commander)! < minPlayCount) {
      avgAttendentsForCommander.delete(commander);
    } else {
      if (!(commander in top16CountForCommander)) {
        top16RatioForCommander.set(commander, 0);
      } else {
        const top16Count = top16CountForCommander.get(commander)!;
        const deckCount = deckCountForCommander.get(commander)!;
        top16RatioForCommander.set(commander, (top16Count / deckCount) * 100);
      }
    }
  }

  top16RatioForCommander = sortMapByValue(top16RatioForCommander);

  const tiers: Record<
    string,
    Array<Array<{ commander: string; top16Ratio: number }>>
  > = {
    '100': [[]],
    '90': [[]],
    '80': [[]],
    '70': [[]],
    '60': [[]],
    '50': [[]],
    '40': [[]],
    '30': [[]],
    '20': [[]],
    '10': [[]],
    '0': [[]],
  };

  const tiersCount: Record<string, number> = {
    '100': 0,
    '90': 0,
    '80': 0,
    '70': 0,
    '60': 0,
    '50': 0,
    '40': 0,
    '30': 0,
    '20': 0,
    '10': 0,
    '0': 0,
  };

  for (const commander of Array.from(top16RatioForCommander.keys())) {
    for (const key in tiers) {
      const i = parseInt(key);
      const top16Ratio = top16RatioForCommander.get(commander)!;

      if (top16Ratio >= i && top16Ratio < i + 9.999999999999999) {
        if (tiers[key][tiers[key].length - 1].length >= 10) {
          tiers[key].push([]);
        }

        tiers[key][tiers[key].length - 1].push({ commander, top16Ratio });
        tiersCount[key] += 1;
      }
    }
  }

  const nodes: {
    id: string;
    commander: string;
    attendents: number;
    size: number;
    image: string;
    tier: number;
  }[] = [];

  let i = 0;
  for (const tier in tiers) {
    for (const l in tiers[tier]) {
      for (const x in tiers[tier][l]) {
        const { commander } = tiers[tier][l][x];
        nodes.push({
          id: commander,
          commander,
          attendents: avgAttendentsForCommander.get(commander)!,
          size: deckCountForCommander.get(commander)!,
          image: imageForCommander.get(commander)!,
          tier: i,
        });
      }
    }

    i += 1;
  }

  let maxTierLength = 0;
  for (const tier in tiers) {
    for (const l in tiers[tier]) {
      if (tiers[tier][l].length > maxTierLength) {
        maxTierLength = tiers[tier][l].length;
      }
    }
  }

  const edges: { from: string; to: string }[] = [];
  for (let i = 0; i < maxTierLength; i++) {
    for (const tier in tiers) {
      for (const l in tiers[tier]) {
        for (const tier2 in tiers) {
          for (const l2 in tiers[tier2]) {
            if (tiers[tier][l] != tiers[tier2][l2]) {
              edges.push({
                from: tiers[tier][l][i].commander,
                to: tiers[tier2][l2][i].commander,
              });
            }
          }
        }
      }
    }
  }

  return [nodes, edges] as const;
}

export type TierListNode = ReturnType<
  typeof generateTierlistForMinPlayCount
>[0][number];

export type TierListEdge = ReturnType<
  typeof generateTierlistForMinPlayCount
>[1][number];

export async function getTierListGraph() {
  const deckCountForCommander = new Map<string, number>();
  const top16CountForCommander = new Map<string, number>();
  const avgAttendentsForCommander = new Map<string, number>();
  const imageForCommander = new Map<string, string>();

  const tiers = await prisma.tiers.findMany();
  for (const { commander, ...tier } of tiers) {
    if (!commander) continue;
    if (tier.count != null) deckCountForCommander.set(commander, tier.count);
    if (tier.top16s != null) top16CountForCommander.set(commander, tier.top16s);
    if (tier.attendents != null) {
      avgAttendentsForCommander.set(commander, tier.attendents);
    }

    if (tier.image != null) imageForCommander.set(commander, tier.image);
  }

  const nodesForPlayCountCutoff = new Map<number, TierListNode[]>();
  const edgesForPlayCountCutoff = new Map<number, TierListEdge[]>();
  const playCounts = Array.from(new Set(deckCountForCommander.values()));
  for (const playCount of playCounts) {
    const [nodes, edges] = generateTierlistForMinPlayCount(
      playCount,
      deckCountForCommander,
      top16CountForCommander,
      avgAttendentsForCommander,
      imageForCommander
    );

    nodesForPlayCountCutoff.set(playCount, nodes);
    edgesForPlayCountCutoff.set(playCount, edges);
  }

  return { nodesForPlayCountCutoff, edgesForPlayCountCutoff };
}
