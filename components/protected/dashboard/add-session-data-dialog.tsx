import {
  Button,
  Flex,
  Text,
  TextField,
  Dialog,
  Card,
  Heading,
  ScrollArea,
  Select,
  Callout,
} from "@radix-ui/themes";
import React from "react";
import { BRAINL_LOBE, RadixColorOptions } from "@common/enum";
import { AlertTriangle, Plus } from "lucide-react";
import { BRAINWAVE_BANDS } from "@common/enum";
import { useUserStore } from "@stores/useUserStore";
import { useToast } from "@providers/toast-provider/toastProvider";

type FieldConfig = {
  dbLabel: string;
  label: string;
  type?: "text" | "number";
  defaultValue: string;
  placeholder: string;
};

const groupedFields1: FieldConfig[] = [
  {
    dbLabel: "z_score",
    label: "Z-Score",
    type: "number",
    defaultValue: "3.5",
    placeholder: "Enter the z-score",
  },
  {
    dbLabel: "frequency",
    label: "Frequency (Hz)",
    type: "number",
    defaultValue: "10",
    placeholder: "Enter the frequency",
  },
  {
    dbLabel: "brodmann_area",
    label: "Brodmann Area (BA)",
    type: "number",
    defaultValue: "46",
    placeholder: "Enter the brodmann area",
  },
];

const groupedFields2: FieldConfig[] = [
  {
    dbLabel: "lobe",
    label: "Brain Lobe",
    defaultValue: BRAINL_LOBE.Frontal,
    placeholder: "Enter the brain lobe",
  },
  {
    dbLabel: "region",
    label: "Brain Region",
    defaultValue: "Prefrontal Cortex",
    placeholder: "Enter the brain region",
  },
];

const stackedFields: FieldConfig[] = [
  {
    dbLabel: "functions",
    label: "Functions",
    // defaultValue: "Executive Functions, Working Memory",
    defaultValue: "",
    placeholder: "Enter the functions",
  },
  {
    dbLabel: "possible_symptoms_of_defect",
    label: "Possible symptoms of defect",
    // defaultValue: "Impulsivity, Lack of motivation, Difficulty concentrating",
    defaultValue: "",
    placeholder: "Enter the possible symptoms of defect",
  },
];

type FieldProps = {
  dbLabel: string;
  label: string;
  type?: "text" | "number";
  placeholder: string;
  value: string | number;
  onChange: (value: string) => void;
};

const DisplayField: React.FC<FieldProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <Flex direction="column" gap="1">
    <Text size="1" weight="bold">
      {label}
    </Text>
    <TextField.Root
      size="1"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </Flex>
);

const SelectField: React.FC<FieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => (
  <Flex direction="column" gap="1" maxWidth="160px">
    <Text size="1" weight="bold">
      {label}
    </Text>
    <Select.Root value={value.toString()} onValueChange={onChange} size="1">
      <Select.Trigger placeholder={placeholder} />
      <Select.Content position="popper">
        <Select.Group>
          {Object.values(BRAINL_LOBE).map((lobe) => (
            <Select.Item key={lobe} value={lobe}>
              {lobe}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  </Flex>
);

const BandCard: React.FC<{
  band: string;
  formData: Record<string, string | number>;
  setFormData: (data: Record<string, string | number>) => void;
}> = ({ band, formData, setFormData }) => (
  <Card size="2" variant="surface">
    <Flex direction="column" gap="4">
      <Heading size="5" weight="bold">
        {band.toUpperCase()}
      </Heading>
      <Flex direction="row" gap="4" wrap="wrap">
        {groupedFields1.map((field, idx) => (
          <DisplayField
            key={idx}
            {...field}
            value={formData[field.dbLabel]}
            onChange={(val) =>
              setFormData({
                ...formData,
                [field.dbLabel]: field.type === "number" ? Number(val) : val,
              })
            }
          />
        ))}
      </Flex>
      <Flex direction="row" gap="4" wrap="wrap">
        <SelectField
          {...groupedFields2[0]}
          value={formData[groupedFields2[0].dbLabel]}
          onChange={(val) =>
            setFormData({
              ...formData,
              [groupedFields2[0].dbLabel]: val,
            })
          }
        />
        <DisplayField
          {...groupedFields2[1]}
          value={formData[groupedFields2[1].dbLabel]}
          onChange={(val) =>
            setFormData({
              ...formData,
              [groupedFields2[1].dbLabel]:
                groupedFields2[1].type === "number" ? Number(val) : val,
            })
          }
        />
      </Flex>
      <Flex direction="column" gap="4">
        {stackedFields.map((field, idx) => (
          <DisplayField
            key={idx}
            {...field}
            value={formData[field.dbLabel]}
            onChange={(val) =>
              setFormData({
                ...formData,
                [field.dbLabel]: field.type === "number" ? Number(val) : val,
              })
            }
          />
        ))}
      </Flex>
    </Flex>
  </Card>
);

const AddSessionDataDialog = () => {
  const user = useUserStore((state) => state.user);
  const { showToast } = useToast();

  const [sessionNumber, setSessionNumber] = React.useState<number>(1);
  const [formData, setFormData] = React.useState<
    Record<string, Record<string, string | number>>
  >(() => {
    const initial: Record<string, Record<string, string | number>> = {};
    Object.values(BRAINWAVE_BANDS).forEach((band) => {
      initial[band] = {};
      [...groupedFields1, ...groupedFields2, ...stackedFields].forEach(
        (field) => {
          initial[band][field.dbLabel] =
            field.type === "number"
              ? Number(field.defaultValue)
              : field.defaultValue;

          initial[band]["brainwave_band"] = band;
        }
      );
    });
    return initial;
  });

  const handleSave = async () => {
    if (sessionNumber === undefined || sessionNumber === 0) {
      showToast({
        title: "Error",
        description: "Please enter a valid session number.",
        color: "error",
      });
      return;
    }

    const invalidBands = Object.entries(formData).filter(([band, data]) => {
      const zScore = data["z_score"];
      const frequency = data["frequency"];
      const brodmannArea = data["brodmann_area"];
      return (
        !zScore ||
        !frequency ||
        !brodmannArea ||
        isNaN(Number(zScore)) ||
        isNaN(Number(frequency)) ||
        isNaN(Number(brodmannArea)) ||
        Number(frequency) < 0 ||
        Number(brodmannArea) < 1 ||
        Number(brodmannArea) > 52
      );
    });
    if (invalidBands.length > 0) {
      showToast({
        title: "Error",
        description: `Please enter valid numbers for z-score, frequency and brodmann area. Broadmann area must be between 1 and 52. Invalid bands: ${invalidBands
          .map(([band]) => band)
          .join(", ")}.`,
        color: "error",
        duration: 10000,
      });
      return;
    }

    const finalData: Record<
      string,
      { [x: string]: string | number }[] | number | string
    > = {
      user_id: user!.id,
      session_number: sessionNumber,
      bands: Object.entries(formData).map(([band, data]) => ({
        ...data,
      })),
    };

    const res = await fetch("/api/sloreta-session-data/create-session-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });

    const json = await res.json();
    if (res.ok) {
      showToast({
        title: "Saved!",
        description: json.message,
        color: "success",
      });
    } else {
      showToast({
        title: "Error",
        description: json.error,
        color: "error",
      });
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          variant="solid"
          size={{ initial: "1", xs: "1", sm: "2", md: "2" }}
          color={RadixColorOptions.GREEN}
          style={{ color: "var(--text-default)" }}
        >
          <Plus height="16" width="16" />
          Add Session Data
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Add Session Data</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add sLORETA session data to database.<br></br> If the session already
          exists, it will overwrite the existing data.
        </Dialog.Description>

        {sessionNumber === undefined && (
          <Callout.Root color="red" role="alert">
            <Callout.Icon>
              <AlertTriangle />
            </Callout.Icon>
            <Callout.Text>
              Please fill up the session number before inserting to database.
            </Callout.Text>
          </Callout.Root>
        )}

        <ScrollArea type="always" scrollbars="vertical" style={{ height: 400 }}>
          <Flex direction="column" gap="4" pr="4">
            <Card size="2" variant="surface">
              <Flex direction="row" gap="4" align="center" wrap="wrap">
                <Heading size="5" weight="bold">
                  Session Number
                </Heading>
                <TextField.Root
                  size="2"
                  type="number"
                  placeholder="Enter session number"
                  value={sessionNumber}
                  onChange={(e) => setSessionNumber(Number(e.target.value))}
                />
              </Flex>
            </Card>
            {Object.values(BRAINWAVE_BANDS).map((band) => (
              <BandCard
                key={band}
                band={band}
                formData={formData[band]}
                setFormData={(data) =>
                  setFormData((prev) => ({ ...prev, [band]: data }))
                }
              />
            ))}
          </Flex>
        </ScrollArea>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              onClick={() => {
                handleSave();
              }}
            >
              Insert to database
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddSessionDataDialog;
