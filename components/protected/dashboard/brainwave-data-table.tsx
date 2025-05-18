import React from "react";
import { Table, ScrollArea } from "@radix-ui/themes";
import BrainwaveData from "@common/models/sloreta-brainwave-data-model";

const BrainwaveDataTable = ({
  brainwaveData,
}: {
  brainwaveData: BrainwaveData[];
}) => {
  return (
    <ScrollArea
      className="max-w-[85vw] sm:max-w-[85vw] md:max-w-[100vw]"
      scrollbars="horizontal"
    >
      <Table.Root size="1" variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Brainwave Band</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Z-Score</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Frequency (Hz)</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Lobe</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Region</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Brodmann Area</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Functions</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Symptoms</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {brainwaveData.map((data) => (
            <Table.Row key={data.id}>
              <Table.Cell>{data.brainwave_band}</Table.Cell>
              <Table.Cell>{data.z_score}</Table.Cell>
              <Table.Cell>{data.frequency}</Table.Cell>
              <Table.Cell>{data.lobe}</Table.Cell>
              <Table.Cell>{data.region}</Table.Cell>
              <Table.Cell>{data.brodmann_area}</Table.Cell>
              <Table.Cell
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {data.functions}
              </Table.Cell>
              <Table.Cell
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {data.possible_symptoms_of_defect}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </ScrollArea>
  );
};

export default BrainwaveDataTable;
