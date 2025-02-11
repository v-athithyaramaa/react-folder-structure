// TestDetails.jsx
import React from "react";

const TestDetails = ({ testCase }) => {
  return (
    <div className="test-details-container">
      <div className="test-properties">
        <h2>Test Properties</h2>

        <div className="property-grid">
          {/* Left Column */}
          <div className="property-column">
            <div className="property-field">
              <label>TestCase Name:</label>
              <div className="value-box">{testCase.testCaseId}</div>
            </div>
            <div className="property-field">
              <label>Template/Profile:</label>
              <div className="value-box">{testCase.profile}</div>
            </div>
            <div className="property-field">
              <label>WorkStation:</label>
              <div className="value-box">ATM Terminal</div>
            </div>
          </div>

          {/* Right Column */}
          <div className="property-column">
            <div className="property-field">
              <label>TestCase ID:</label>
              <div className="value-box">{testCase.testCaseId}</div>
            </div>
            <div className="property-field">
              <label>Card:</label>
              <div className="value-box">{testCase.cardName}</div>
            </div>
            <div className="property-field">
              <label>Counter Verification:</label>
              <div className="toggle-group">
                <button className="toggle-btn active">Baseline</button>
                <button className="toggle-btn">Manual</button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="transaction-table">
          <div className="table-header">
            <div className="header-cell">SEND</div>
            <div className="header-cell">RECEIVE</div>
            <div className="header-cell">VERIFICATION</div>
            <div className="header-cell action-cell">+ Manage Legs</div>
          </div>

          <div className="table-body">
            {/* Header Row */}
            <div className="table-row header-row">
              <div className="cell">Fields</div>
              <div className="cell">Description</div>
              <div className="cell">Leg 1</div>
              <div className="cell"></div>
            </div>

            {/* Data Rows */}
            <div className="table-row">
              <div className="cell">m1</div>
              <div className="cell">Message class</div>
              <div className="cell">1</div>
              <div className="cell"></div>
            </div>

            <div className="table-row">
              <div className="cell">m2</div>
              <div className="cell">Message sub-class</div>
              <div className="cell">1</div>
              <div className="cell"></div>
            </div>

            {/* Add remaining rows similarly */}
            <div className="table-row">
              <div className="cell">m7</div>
              <div className="cell">Track 2:</div>
              <div className="cell">2</div>
              <div className="cell"></div>
            </div>

            <div className="table-row">
              <div className="cell">m10</div>
              <div className="cell">Amount Entry:</div>
              <div className="cell">D AB AA</div>
              <div className="cell"></div>
            </div>

            <div className="table-row">
              <div className="cell">m11</div>
              <div className="cell">PIN Buffer:</div>
              <div className="cell">2222</div>
              <div className="cell"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
