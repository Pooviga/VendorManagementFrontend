import React from 'react'
import { FaAlignRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import '../Viewvendors/Viewvendors.css'
import Addvendors from '../Addvendors/Addvendors'
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup'
import { useEffect, useState } from "react"
import axios from 'axios'


function Viewvendors() {
  const navigate = useNavigate("/")
  const [vendorDetails, setVendorDetails] = useState([]);
  const [productDetails, setProductDetails] = useState([]);


  const [details, setDetails] = useState([]);
  var data = [];
  var vdata = [];
  var pdata = [];
  // const navigate = useNavigate("/");

  useEffect(() => {
    axios.get("https://localhost:7017/api/VendorDetails").then((response) => {
      setDetails(response.data);
      response.data.map((newdata) => {
        vdata.push(newdata.vendorDetails);
        setVendorDetails(vdata);
        pdata.push(newdata.productDetails);
        setProductDetails(pdata);
      });

      console.log("asigned", vdata);
      console.log("asigned", pdata);

      // console.log('here:',response.data.vendorDetails);
      // setVendorDetails(response.data.vendorDetails)
    });
  }, []);

  useEffect(() => {
    console.log("new", details);
  }, []);

  function deleteVendor(id) {

    axios.delete("https://localhost:7017/api/VendorDetails/" + id)

      .then((response) => {

        console.log('deleted', response.data)

        axios.get("https://localhost:7017/api/VendorDetails").then((response) => {

          setDetails(response.data);

          response.data.map((newdata) => {

            vdata.push(newdata.vendorDetails);

            setVendorDetails(vdata);

            pdata.push(newdata.productDetails);

            setProductDetails(pdata);

          });

          console.log("changed", vdata);

          console.log("changed", pdata);

        });

      })



  }


  console.log("asigned 1 :", vendorDetails);
  console.log("asigned 2 :", productDetails);


  return (
    <div class="viewvendorswholediv">
      <div className="topics">
        <h3 className="rh2">Vendors</h3>
        {/* <Popup trigger={<button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button>} position="left center">
                    <div><Addvendors /></div>
                </Popup> */}
        <Popup trigger=
          {<button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button>}
          modal nested>
          {
            close => (
              <div className='modals'>
                <div>
                  <button className="close_cross" onClick=
                    {() => close()}>
                    X
                  </button>
                </div>
                <div className='content-vendor'>
                  <Addvendors />
                </div>

              </div>
            )
          }
        </Popup>
      </div>

      <div className='table_overflow'>

        <table>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Vendor Name</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendorDetails.map((x, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{x.vendorName}</td>
                  <td>Product</td>
                  <td>{x.isActive ? 'active' : 'inactive'}</td>
                  <td>

                    <Popup trigger=

                      {

                        <button type="button" class="btn-btn">

                          <i class="far fa-eye"></i>

                        </button>

                      }

                      modal nested>

                      {

                        close => (

                          <div className='modal'>

                            <div>

                              <button className="btn-btn" style={{ float: 'right' }} onClick={() => close()}>

                                <i class="fa-regular fa-rectangle-xmark"></i>

                              </button>

                            </div>

                            <div className='vendor-details'>

                              vendorDetails<br /><br />

                            </div>

                            <p>

                              id : {index}




                              "id": {x.id}



                              "vendorName": {x.vendorName},




                              "isActive": {x.isActive},




                              "vendorType": {x.vendorType},




                              "addressLine1": {x.addressLine1},



                              "addressLine2": {x.addressLine2},



                              "city": {x.city},



                              "state": {x.state},



                              "postalCode": {x.postalCode},



                              "country": {x.country},



                              "telePhone1": {x.telePhone1},



                              "telePhone2": {x.telePhone2},



                              "vendorEmail": {x.vendorEmail},



                              "vendorWebsite": {x.vendorWebsite},



                              "createdOn": null,



                              "updatedOn": null,



                              "deletedOn": null

                            </p>

                            productDetails<br /><br />

                            <p>{productDetails[index].id}</p>

                          </div>

                        )

                      }

                    </Popup>



                    <button style={{ fontSize: '24px' }} type="button" class="btn-btn">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button style={{ fontSize: '24px' }} type="button" class="btn-btn" onClick={() => deleteVendor(x.id)}>
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Viewvendors