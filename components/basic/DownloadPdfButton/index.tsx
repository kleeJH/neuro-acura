"use client";

import { useState } from "react";
import { Modal } from "antd";
import { AlertCircle, Download } from "lucide-react";

import ShinyButton from "../ShinyButton";

const DownloadPdfButton = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to trigger file download
  const downloadFile = async () => {
    // Create a link element and trigger a download
    // const link = document.createElement("a");
    // link.href = "/assets/files/TDJ2023EnrolmentForm.pdf";
    // link.download = "TDJ 2023 Enrolment Form.pdf";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    setLoading(true);
    downloadFile();
    setTimeout(() => {
      setOpen(false);
      setLoading(false);
    }, 1500);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <ShinyButton
        buttonText="Download Enrolment Form"
        icon={<Download aria-hidden="true" className="h-4 w-4" />}
        callbackFunc={showModal}
      />

      <Modal
        open={open}
        closable={false}
        title={
          <div className="flex flex-row gap-3 items-center pink-text-gradient text-[18px] font-semibold">
            <AlertCircle aria-hidden="true" className="h-5 w-5 text-accent" />
            <h1> Confirmation</h1>
          </div>
        }
        onOk={handleConfirm}
        okType="default"
        okText="Confirm"
        confirmLoading={loading}
        okButtonProps={{
          style: { backgroundColor: "hsla(96, 65%, 63%, 0.7)" },
        }}
        onCancel={handleCancel}
      >
        <p>Do you wish to download the enrolment form?</p>
      </Modal>
    </>
  );
};

export default DownloadPdfButton;
