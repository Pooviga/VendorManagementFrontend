import React, { useContext } from 'react'
import { FaAlignRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import '../Viewvendors/Viewvendors.css'
import Addvendors from '../Addvendors/Addvendors'
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup'
import { useEffect, useState } from "react"
import axios from 'axios'
import DataContext from '../../DataContext/DataContext'


function Viewvendors() {
    const navigate = useNavigate()

    const {vendorDetails,setVendorDetails,productDetails,setProductDetails} =useContext(DataContext)
  
    const [details, setDetails] = useState([]);
    var vData = [];
    var pData = [];
    // const navigate = useNavigate("/");
  // const [dataset,setDataset]=useState([])  
  
    useEffect(() => {
      axios.get("https://localhost:7017/api/VendorDetails").then((response) => {
        setDetails(response.data);
        response.data.map((newData) => {
          vData.push(newData.vendorDetails);
          setVendorDetails(vData);
          pData.push(newData.productDetails);
          setProductDetails(pData);
        });
        
        // console.log("asigned", vData);
        // console.log("asigned", pData);
  
        // console.log('here:',response.data.vendorDetails);
        // setVendorDetails(response.data.vendorDetails)
      });
    }, []);


  
    function deleteVendor(id) {
      axios.delete("https://localhost:7017/api/VendorDetails/"+id)
      .then((response) => {
          console.log('deleted',response.data)
          axios.get("https://localhost:7017/api/VendorDetails").then((response) => {
            setDetails(response.data);
            response.data.map((newdata) => {
              vData.push(newdata.vendorDetails);
              setVendorDetails(vData);
              pData.push(newdata.productDetails);
              setProductDetails(pData);
            });
      
            console.log("changed", vData);
            console.log("changed", pData);
      
            // console.log('here:',response.data.vendorDetails);
            // setVendorDetails(response.data.vendorDetails)
          });
          })
      
          }
  

    
    
    return (
        <div class="viewvendorswholediv">
            <div className="topics">
                <h2 className="rh2">Registered Vendors</h2>

          {/* code for view in add vendor as pop */}

                <Popup trigger=
                    {<button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button>}
                    modal nested>
                    {
                        close => (
                            <div className='modal'>
                                <div>
                                    <button className="btn-btn" style={{float: 'right'}}  onClick={() => close()}>
                                        <i class="fa-regular fa-rectangle-xmark"></i>
                                    </button>
                                </div>
                                <div className='content'>
                                    <Addvendors />
                                </div>

                            </div>
                        )
                    }
                </Popup>
                {/* <button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button> */}
            </div>
            {/* <div class="table_overflow">
                <table id="vendorTable">
                    <tr>
                        <th>Vendor Name</th>
                        <th>Vendor Type</th>
                        <th>Contact</th>
                        <th>Vendor Email</th>
                        <th>Action</th>
                    </tr>
                </table>
            </div> */}

          {/* code for viewing short details of vendors */}

    <div class="container">
      <div class="row">
        <div class="col-12">
          <table class="table table-bordered">
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
              {vendorDetails.map((x,index) => {
                return (
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{x.vendorName}</td>
                    <td>Product</td>
                    <td>{x.isActive?'active':'inactive'}</td>
                    <td>

                    {/* code for viewing full vendor details as popup */}
                  

                    <Popup trigger=
                    {                      
                    <button  type="button" class="btn-btn">
                    <i class="far fa-eye"></i>
                    </button>
                    }
                    modal nested>
                    {
                        close => (
                            <div className='modal'>
                                <div>
                                    <button className="btn-btn" style={{float: 'right'}}  onClick={() => close()}>
                                        <i class="fa-regular fa-rectangle-xmark"></i>
                                    </button>
                                </div>
                                <div className='vendor-details'>
                                  vendorDetails
                                  productDetails
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
                            </div>
                        )
                    }
                </Popup>
                      <button  type="button" class="btn-btn">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button  type="button" class="btn-btn" onClick={()=>deleteVendor(x.id)}>
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
    </div>

        </div>
    )
}

export default Viewvendors