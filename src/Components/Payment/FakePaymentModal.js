import React from "react";

function FakePaymentModal({ onConfirm, onCancel }) {
  return (
    <div
      className="fake-payment-modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h4>Fake Payment</h4>
        <p>Pay $10 to download this VIP SVG file.</p>
        <button className="btn btn-success m-1" onClick={onConfirm}>
          Confirm Payment
        </button>
        <button className="btn btn-secondary m-1" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default FakePaymentModal;
