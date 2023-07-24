import { PDFExport } from "@progress/kendo-react-pdf";
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PdfGenerator(prop) {
  const location = useLocation();
  let data = location.state;
  console.log("logg:", prop);
  const navigate = useNavigate();
  var temp = data.purchaseOrderWithUsersName.approvedDateTime.split(" ");
  let apDate = temp[0];

  const pdfExportComponent = useRef(null);

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  let total = 0;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <PDFExport ref={pdfExportComponent}>
        <div style={{ height: "auto", width: "830px", padding: "30px" }}>
          {/* table 1 */}
          <table className="pdftbl">
            <tr>
              <th>
                <img src="https://assets.newamericanfunding.com/images/logos/logo-new-american-funding.svg" />
              </th>
              <th>Purchase Order</th>
            </tr>
          </table>
          {/* table 2 */}
          <table className="pdftbl">
            <tr>
              <th>New American Funding</th>
              <th>purchase order for</th>
            </tr>
            <tr>
              <td>
                {data.purchaseOrderWithUsersName.billingAddress +
                  "," +
                  data.purchaseOrderWithUsersName.billingAddressCity}
              </td>
              <td>{data.vendorForPurchaseOrder.vendorName}</td>
            </tr>
            <tr>
              <td>
                {data.purchaseOrderWithUsersName.billingAddressState +
                  "," +
                  data.purchaseOrderWithUsersName.billingAddressCountry +
                  "-" +
                  data.purchaseOrderWithUsersName.billingAddressZipcode}
              </td>
              <td>{apDate}</td>
            </tr>
          </table>
          {/* table 3 */}

          {/* table 4 */}
          <h2>Product Details</h2>
          <table className="pdftbl">
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
            {data.purchaseProducts.map((m) => {
              total = total + m.price * m.quantity;
              return (
                <tr>
                  <td>{m.productName}</td>
                  <td>{m.quantity}</td>
                  <td>{m.price}</td>
                  <td>{m.price * m.quantity}</td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td>Grand Total</td>
              <td>{total}</td>
            </tr>
          </table>
          {/* table 4 */}
          <table className="pdftbl">
            <tr>
              <th>Shipping Address</th>
            </tr>
            <tr>
              <td>
                {data.purchaseOrderWithUsersName.billingAddressCity} Branch
              </td>
            </tr>
            <tr>
              <td>
                {data.purchaseOrderWithUsersName.billingAddress +
                  "," +
                  data.purchaseOrderWithUsersName.billingAddressCity}
              </td>
            </tr>
            <tr>
              <td>
                {data.purchaseOrderWithUsersName.billingAddressState +
                  "," +
                  data.purchaseOrderWithUsersName.billingAddressCountry +
                  "-" +
                  data.purchaseOrderWithUsersName.billingAddressZipcode}
              </td>
            </tr>
          </table>

          {data.purchaseOrderWithUsersName.description != "" ? (
            <table>
              <tr>
                <th>important!</th>
              </tr>
              <tr>
                <td>{data.purchaseOrderWithUsersName.description}</td>
              </tr>
            </table>
          ) : (
            ""
          )}
        </div>
      </PDFExport>
      <div style={{ marginLeft: "25px" }}>
        <button className="add_button" onClick={handleExportWithComponent}>
          <i class="fa-solid fa-cloud-arrow-down"></i> Download
        </button>
        <br />
        <button
          className="add_button"
          style={{ marginTop: "-20px" }}
          onClick={() => navigate("/purchaseorders")}
        >
          <i class="fa-solid fa-arrow-left"></i> go back
        </button>
      </div>
    </div>
  );
}

export default PdfGenerator;
