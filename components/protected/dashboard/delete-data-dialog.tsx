import {
  Button,
  Flex,
  Text,
  TextField,
  Dialog,
  Card,
  Heading,
} from "@radix-ui/themes";
import React from "react";
import { RadixColorOptions } from "@common/enum";
import { Trash, X } from "lucide-react";

const DeleteDataDialog = () => {
  const [deleteSessionNumber, setDeleteSessionNumber] = React.useState<
    number | undefined
  >(undefined);

  const handleDeleteSession = () => {
    if (deleteSessionNumber === undefined) {
      console.error("Session number is required to delete a session.");
      return;
    }
    console.log("Deleted session number:", deleteSessionNumber);
  };

  const handleDeleteAllData = () => {
    console.log("Deleted all data.");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          variant="solid"
          size={{ initial: "1", xs: "1", sm: "2", md: "2" }}
          color={RadixColorOptions.RED}
          style={{ color: "var(--text-default)" }}
        >
          <Trash height="16" width="16" />
          Delete Data
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Delete Data</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Delete sLORETA data in database.
        </Dialog.Description>

        <Flex direction="column" gap="4">
          <Card size="2" variant="surface">
            <Flex direction="column" gap="4" wrap="wrap">
              <Heading size="5" weight="bold">
                Delete A Single Session
              </Heading>
              <Flex direction="row" gap="4" align="center" wrap="wrap">
                <Heading size="3" weight="bold">
                  Session Number
                </Heading>
                <TextField.Root
                  size="2"
                  type="number"
                  placeholder="Enter session number"
                  value={deleteSessionNumber}
                  onChange={(e) => {
                    e.preventDefault();
                    setDeleteSessionNumber(Number(e.target.value));
                  }}
                />
              </Flex>
              <Button
                variant="solid"
                size={{ initial: "1", xs: "1", sm: "2", md: "2" }}
                color={RadixColorOptions.RED}
                style={{ color: "var(--text-default)" }}
                onClick={handleDeleteSession}
              >
                <Trash height="16" width="16" />
                Delete This Session Data
              </Button>
            </Flex>
          </Card>
          <Card size="2" variant="surface">
            <Flex direction="column" gap="4" wrap="wrap">
              <Heading size="5" weight="bold">
                Delete All Data
              </Heading>
              <Button
                variant="solid"
                size={{ initial: "1", xs: "1", sm: "2", md: "2" }}
                color={RadixColorOptions.RED}
                style={{ color: "var(--text-default)" }}
                onClick={handleDeleteAllData}
              >
                <X height="16" width="16" />
                Delete All Data
              </Button>
            </Flex>
          </Card>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteDataDialog;
