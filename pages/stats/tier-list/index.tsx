import { GetStaticProps } from 'next';
import { useEffect, useRef } from 'react';
import * as vis from 'vis-network';
import { PageLayout } from '../../../components/page_layout';
import {
  getTierListGraph,
  TierListEdge,
  TierListNode,
} from '../../../lib/tier_list_graph';

/*  Python generated JS we want to match.

// initialize global variables.
var edges;
var nodes;
var network; 
var container;
var options, data;


// This method is responsible for drawing the graph, returns the drawn network
function drawGraph() {
    var container = document.getElementById('mynetwork');
  
    // parsing and collecting nodes and edges from the python
    nodes = new vis.DataSet([{"id": "100% Turnover", "label": "100% Turnover", "level": 0, "shape": "circle"}, {"id": "90-99% Turnover", "label": "90-99% Turnover", "level": 1, "shape": "circle"}, {"id": "80-89% Turnover", "label": "80-89% Turnover", "level": 2, "shape": "circle"}, {"id": "70-79% Turnover", "label": "70-79% Turnover", "level": 3, "shape": "circle"}, {"id": "60-69% Turnover", "label": "60-69% Turnover", "level": 4, "shape": "circle"}, {"id": "50-59% Turnover", "label": "50-59% Turnover", "level": 5, "shape": "circle"}, {"id": "40-49% Turnover", "label": "40-49% Turnover", "level": 6, "shape": "circle"}, {"id": "30-39% Turnover", "label": "30-39% Turnover", "level": 7, "shape": "circle"}, {"id": "20-29% Turnover", "label": "20-29% Turnover", "level": 8, "shape": "circle"}, {"id": "10-19% Turnover", "label": "10-19% Turnover", "level": 9, "shape": "circle"}, {"id": "0-9% Turnover", "label": "0-9% Turnover", "level": 10, "shape": "circle"}, {"borderWidth": 5, "color": "green", "id": "Yuriko, the Tiger\u0027s Shadow", "image": "https://cards.scryfall.io/art_crop/front/3/b/3bd81ae6-e628-447a-a36b-597e63ede295.jpg?1592710334", "label": "Yuriko, the Tiger\u0027s Shadow", "level": 5, "shape": "circularImage", "size": 11.11111111111111, "title": "Played 7 times\n57.14% Conversion Rate\n64 Average Attendents"}, {"borderWidth": 5, "color": "green", "id": "Sisay, Weatherlight Captain", "image": "https://cards.scryfall.io/art_crop/front/5/a/5a293c45-1e73-4527-be2f-2dcd5c47b610.jpg?1650730165", "label": "Sisay, Weatherlight Captain", "level": 6, "shape": "circularImage", "size": 11.11111111111111, "title": "Played 7 times\n42.86% Conversion Rate\n88 Average Attendents"}, {"borderWidth": 5, "color": "green", "id": "Bruse Thrasios Dawnwaker", "image": "https://cards.scryfall.io/art_crop/front/1/2/125b552b-45ea-4e0b-94a9-8131c97a04c0.jpg?1644853018", "label": "Bruse Thrasios Dawnwaker", "level": 7, "shape": "circularImage", "size": 20.634920634920633, "title": "Played 13 times\n38.46% Conversion Rate\n127 Average Attendents"}, {"borderWidth": 5, "color": "green", "id": "Tivit Time Sieve", "image": "https://cards.scryfall.io/art_crop/front/9/2/9235977e-a999-4ed0-83a3-742be87b13bb.jpg?1673481721", "label": "Tivit Time Sieve", "level": 7, "shape": "circularImage", "size": 19.047619047619047, "title": "Played 12 times\n33.33% Conversion Rate\n118 Average Attendents"}, {"borderWidth": 5, "color": "green", "id": "Malcolm Tana Glinthorn", "image": "https://cards.scryfall.io/art_crop/front/b/b/bbc3bbda-a4bc-4302-a3fc-b1c89f0f5461.jpg?1608909299", "label": "Malcolm Tana Glinthorn", "level": 8, "shape": "circularImage", "size": 19.047619047619047, "title": "Played 12 times\n25.0% Conversion Rate\n142 Average Attendents"}, {"borderWidth": 1, "color": "black", "id": "Kinnan, Bonder Prodigy", "image": "https://cards.scryfall.io/art_crop/front/6/3/63cda4a0-0dff-4edb-ae67-a2b7e2971350.jpg?1591228085", "label": "Kinnan, Bonder Prodigy", "level": 8, "shape": "circularImage", "size": 15.873015873015872, "title": "Played 10 times\n20.0% Conversion Rate\n132 Average Attendents"}, {"borderWidth": 1, "color": "black", "id": "Winota Stax", "image": "https://cards.scryfall.io/art_crop/front/5/d/5dd13a6c-23d3-44ce-a628-cb1c19d777c4.jpg?1654630670", "label": "Winota Stax", "level": 8, "shape": "circularImage", "size": 39.682539682539684, "title": "Played 25 times\n20.0% Conversion Rate\n120 Average Attendents"}, {"borderWidth": 5, "color": "red", "id": "Kraum Tymna Breach", "image": "https://cards.scryfall.io/art_crop/front/5/5/557fcd17-6cb3-414a-b2b1-ea9ae32e5aec.jpg?1644853032", "label": "Kraum Tymna Breach", "level": 9, "shape": "circularImage", "size": 100.0, "title": "Played 63 times\n19.05% Conversion Rate\n132 Average Attendents"}, {"borderWidth": 1, "color": "black", "id": "Thrasios Tymna Midrange", "image": "https://cards.scryfall.io/art_crop/front/2/1/21e27b91-c7f1-4709-aa0d-8b5d81b22a0a.jpg?1606762176", "label": "Thrasios Tymna Midrange", "level": 9, "shape": "circularImage", "size": 25.396825396825395, "title": "Played 16 times\n18.75% Conversion Rate\n122 Average Attendents"}, {"borderWidth": 1, "color": "black", "id": "Krark Sakashima Clones", "image": "https://cards.scryfall.io/art_crop/front/2/4/24614006-d99f-44b6-8ec1-29b48a1713d0.jpg?1661583571", "label": "Krark Sakashima Clones", "level": 9, "shape": "circularImage", "size": 26.984126984126984, "title": "Played 17 times\n17.65% Conversion Rate\n135 Average Attendents"}, {"borderWidth": 1, "color": "black", "id": "Najeela Tempo", "image": "https://cards.scryfall.io/art_crop/front/2/c/2cb1d1da-6077-46b5-8c63-39882b8016f2.jpg?1567181270", "label": "Najeela Tempo", "level": 9, "shape": "circularImage", "size": 26.984126984126984, "title": "Played 17 times\n17.65% Conversion Rate\n123 Average Attendents"}, {"borderWidth": 1, "color": "black", "id": "Rograkh Silas Turbo Naus", "image": "https://cards.scryfall.io/art_crop/front/a/4/a4fab67f-00c2-4125-9262-d21a29411797.jpg?1644853041", "label": "Rograkh Silas Turbo Naus", "level": 9, "shape": "circularImage", "size": 36.507936507936506, "title": "Played 23 times\n17.39% Conversion Rate\n128 Average Attendents"}, {"borderWidth": 1, "color": "black", "id": "Najeela, the Blade-Blossom", "image": "https://cards.scryfall.io/art_crop/front/2/c/2cb1d1da-6077-46b5-8c63-39882b8016f2.jpg?1567181270", "label": "Najeela, the Blade-Blossom", "level": 9, "shape": "circularImage", "size": 15.873015873015872, "title": "Played 10 times\n10.0% Conversion Rate\n124 Average Attendents"}, {"borderWidth": 1, "color": "black", "id": "Inalla Wizard Combo", "image": "https://cards.scryfall.io/art_crop/front/7/c/7c6e803a-451c-4aa6-97a2-400077f32c47.jpg?1627406462", "label": "Inalla Wizard Combo", "level": 10, "shape": "circularImage", "size": 17.46031746031746, "title": "Played 11 times\n9.09% Conversion Rate\n148 Average Attendents"}, {"borderWidth": 5, "color": "red", "id": "K\u0027rrik, Son of Yawgmoth", "image": "https://cards.scryfall.io/art_crop/front/3/5/3592fbe4-8588-486e-99ba-c327b0b6ba24.jpg?1568003491", "label": "K\u0027rrik, Son of Yawgmoth", "level": 10, "shape": "circularImage", "size": 19.047619047619047, "title": "Played 12 times\n8.33% Conversion Rate\n118 Average Attendents"}, {"borderWidth": 5, "color": "red", "id": "Korvold Turbo Naus", "image": "https://cards.scryfall.io/art_crop/front/9/2/92ea1575-eb64-43b5-b604-c6e23054f228.jpg?1571197150", "label": "Korvold Turbo Naus", "level": 10, "shape": "circularImage", "size": 20.634920634920633, "title": "Played 13 times\n7.69% Conversion Rate\n129 Average Attendents"}, {"borderWidth": 5, "color": "red", "id": "Kinnan Infinite Mana", "image": "https://cards.scryfall.io/art_crop/front/6/3/63cda4a0-0dff-4edb-ae67-a2b7e2971350.jpg?1591228085", "label": "Kinnan Infinite Mana", "level": 10, "shape": "circularImage", "size": 11.11111111111111, "title": "Played 7 times\n0.0% Conversion Rate\n143 Average Attendents"}, {"borderWidth": 5, "color": "red", "id": "Malcolm Vial Smasher Turbo Naus", "image": "https://cards.scryfall.io/art_crop/front/b/b/bbc3bbda-a4bc-4302-a3fc-b1c89f0f5461.jpg?1608909299", "label": "Malcolm Vial Smasher Turbo Naus", "level": 10, "shape": "circularImage", "size": 19.047619047619047, "title": "Played 12 times\n0.0% Conversion Rate\n148 Average Attendents"}]);
    edges = new vis.DataSet([{"color": "white", "from": "100% Turnover", "to": "90-99% Turnover"}, {"color": "white", "from": "100% Turnover", "to": "80-89% Turnover"}, {"color": "white", "from": "100% Turnover", "to": "70-79% Turnover"}, {"color": "white", "from": "100% Turnover", "to": "60-69% Turnover"}, {"color": "white", "from": "100% Turnover", "to": "50-59% Turnover"}, {"color": "white", "from": "100% Turnover", "to": "40-49% Turnover"}, {"color": "white", "from": "100% Turnover", "to": "30-39% Turnover"}, {"color": "white", "from": "100% Turnover", "to": "20-29% Turnover"}, {"color": "white", "from": "100% Turnover", "to": "10-19% Turnover"}, {"color": "white", "from": "100% Turnover", "to": "0-9% Turnover"}, {"color": "white", "from": "Yuriko, the Tiger\u0027s Shadow", "to": "Sisay, Weatherlight Captain"}, {"color": "white", "from": "Yuriko, the Tiger\u0027s Shadow", "to": "Bruse Thrasios Dawnwaker"}, {"color": "white", "from": "Yuriko, the Tiger\u0027s Shadow", "to": "Malcolm Tana Glinthorn"}, {"color": "white", "from": "Yuriko, the Tiger\u0027s Shadow", "to": "Kraum Tymna Breach"}, {"color": "white", "from": "Yuriko, the Tiger\u0027s Shadow", "to": "Inalla Wizard Combo"}, {"color": "white", "from": "Sisay, Weatherlight Captain", "to": "Bruse Thrasios Dawnwaker"}, {"color": "white", "from": "Sisay, Weatherlight Captain", "to": "Malcolm Tana Glinthorn"}, {"color": "white", "from": "Sisay, Weatherlight Captain", "to": "Kraum Tymna Breach"}, {"color": "white", "from": "Sisay, Weatherlight Captain", "to": "Inalla Wizard Combo"}, {"color": "white", "from": "Bruse Thrasios Dawnwaker", "to": "Malcolm Tana Glinthorn"}, {"color": "white", "from": "Bruse Thrasios Dawnwaker", "to": "Kraum Tymna Breach"}, {"color": "white", "from": "Bruse Thrasios Dawnwaker", "to": "Inalla Wizard Combo"}, {"color": "white", "from": "Malcolm Tana Glinthorn", "to": "Kraum Tymna Breach"}, {"color": "white", "from": "Malcolm Tana Glinthorn", "to": "Inalla Wizard Combo"}, {"color": "white", "from": "Kraum Tymna Breach", "to": "Inalla Wizard Combo"}, {"color": "white", "from": "Tivit Time Sieve", "to": "Kinnan, Bonder Prodigy"}, {"color": "white", "from": "Tivit Time Sieve", "to": "Thrasios Tymna Midrange"}, {"color": "white", "from": "Tivit Time Sieve", "to": "K\u0027rrik, Son of Yawgmoth"}, {"color": "white", "from": "Kinnan, Bonder Prodigy", "to": "Thrasios Tymna Midrange"}, {"color": "white", "from": "Kinnan, Bonder Prodigy", "to": "K\u0027rrik, Son of Yawgmoth"}, {"color": "white", "from": "Thrasios Tymna Midrange", "to": "K\u0027rrik, Son of Yawgmoth"}, {"color": "white", "from": "Winota Stax", "to": "Krark Sakashima Clones"}, {"color": "white", "from": "Winota Stax", "to": "Korvold Turbo Naus"}, {"color": "white", "from": "Krark Sakashima Clones", "to": "Korvold Turbo Naus"}, {"color": "white", "from": "Najeela Tempo", "to": "Kinnan Infinite Mana"}, {"color": "white", "from": "Rograkh Silas Turbo Naus", "to": "Malcolm Vial Smasher Turbo Naus"}]);

    // adding nodes and edges to the graph
    data = {nodes: nodes, edges: edges};

    var options = {"layout": {"hierarchical": {"direction": "UD", "nodeSpacing": 10}}};

    network = new vis.Network(container, data, options);

    return network;

}

drawGraph();

*/

interface TierListProps {
  nodes: TierListNode[];
  edges: TierListEdge[];
}

export default function TierList({ nodes, edges }: TierListProps) {
  const networkContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (networkContainerRef.current == null) return;
    console.log(nodes);
    console.log(edges);

    const network = new vis.Network(
      networkContainerRef.current,
      { nodes, edges },
      { layout: { hierarchical: { direction: 'UD', nodeSpacing: 10 } } }
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
    // TODO: Remove this when Vis.js is working.
    notFound: true,
    props: { nodes, edges },
  };
};
