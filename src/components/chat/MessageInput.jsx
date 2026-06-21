import React, { useState } from "react";

const MessageInput = ({
  onSend,
  onFileUpload,
}) => {
  const [text, setText] =
    useState("");

  const sendProductReference =
    () => {
      onSend(
        "📦 Product Reference: Dell Latitude 5440",
        "product"
      );
    };

  const sendAvailability =
    () => {
      onSend(
        "✅ Availability Query: Is stock available?",
        "product"
      );
    };

  const sendQuantity =
    () => {
      onSend(
        "🔢 Quantity Requirement: Need 50 units",
        "product"
      );
    };

  const sendOrderQuery =
    () => {
      onSend(
        "🛒 Order Query: What is delivery time?",
        "product"
      );
    };

  return (
    <div className="message-input">

      <div className="quick-actions">

        <button
          onClick={
            sendProductReference
          }
        >
          Product
        </button>

        <button
          onClick={
            sendAvailability
          }
        >
          Availability
        </button>

        <button
          onClick={
            sendQuantity
          }
        >
          Quantity
        </button>

        <button
          onClick={
            sendOrderQuery
          }
        >
          Order Query
        </button>

      </div>

      <input
        type="text"
        placeholder="Type Message..."
        value={text}
        onChange={(e) =>
          setText(
            e.target.value
          )
        }
      />

      <button
        onClick={() => {
          if (
            !text.trim()
          )
            return;

          onSend(
            text,
            "text"
          );

          setText("");
        }}
      >
        Send
      </button>

      <input
        type="file"
        onChange={(e) =>
          onFileUpload(
            e.target.files[0]
          )
        }
      />

    </div>
  );
};

export default MessageInput;