import { GetStaticProps } from 'next';
import { PageLayout } from '../../../components/page_layout';
import {
  getTierListGraph,
  TierListEdge,
  TierListNode,
} from '../../../lib/tier_list_graph';
import * as vis from 'vis-network';
import { useEffect, useRef } from 'react';

interface TierListProps {
  nodes: TierListNode[];
  edges: TierListEdge[];
}

export default function TierList({ nodes, edges }: TierListProps) {
  const networkContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (networkContainerRef.current == null) return;

    const network = new vis.Network(
      networkContainerRef.current,
      {
        nodes: nodes,
        edges: edges,
      },
      {}
    );

    return () => {
      network.destroy();
    };
  }, [edges, nodes]);

  return (
    <PageLayout title="Tier List">
      <h1>Tier List</h1>
      <div ref={networkContainerRef} className="w-full h-64" />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<TierListProps> = async () => {
  const { nodesForPlayCountCutoff, edgesForPlayCountCutoff } =
    await getTierListGraph();

  const playCount = Array.from(nodesForPlayCountCutoff.keys())[0];
  const nodes = nodesForPlayCountCutoff.get(playCount)!;
  const edges = edgesForPlayCountCutoff.get(playCount)!;

  return {
    props: { nodes, edges },
  };
};
