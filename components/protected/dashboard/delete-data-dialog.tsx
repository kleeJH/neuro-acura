import {
  Button,
  Flex,
  TextField,
  Dialog,
  Card,
  Heading,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { RadixColorOptions } from "@common/enum";
import { Trash, X } from "lucide-react";
import { useToast } from "@providers/toast-provider/toastProvider";
import { del } from "@utils/supabase/helper";
import { extractResponse } from "@utils/response";
import { useUserStore } from "@stores/useUserStore";

const DeleteDataDialog = () => {
  const user = useUserStore((state) => state.user);
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [deleteSessionNumber, setDeleteSessionNumber] =
    React.useState<number>(1);

  const handleDeleteSession = async () => {
    if (deleteSessionNumber === undefined || deleteSessionNumber === 0) {
      setOpen(false);
      showToast({
        title: "Error",
        description: "Please enter a valid session number.",
        color: "error",
      });
      return;
    }

    const confirm = window.confirm(
      `Are you sure you want to delete session number ${deleteSessionNumber}?`
    );
    if (!confirm) return;
    setOpen(false);

    const nextResponse = await del(
      "/api/sloreta-session-data/delete-session-data",
      {
        user_id: user?.id,
        session_number: deleteSessionNumber,
      }
    );
    const response = await extractResponse(nextResponse);

    if (response.ok) {
      showToast({
        title: response.status,
        description: response.message,
        color: "success",
      });
    } else {
      showToast({
        title: response.status,
        description: response.message,
        color: "error",
      });
    }
  };

  const handleDeleteAllData = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete all data? This action cannot be undone."
    );
    if (!confirm) return;
    setOpen(false);

    const nextResponse = await del(
      "/api/sloreta-session-data/delete-all-data",
      {
        user_id: user?.id,
      }
    );
    const response = await extractResponse(nextResponse);

    if (response.ok) {
      showToast({
        title: response.status,
        description: response.message,
        color: "success",
      });
    } else {
      showToast({
        title: response.status,
        description: response.message,
        color: "error",
      });
    }
  };

  const openChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Dialog.Root open={open} onOpenChange={openChange}>
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
