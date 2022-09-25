import React, { Component } from "react";

import "./FarmerDashboard.css";
// import "../Product/GetUserMenus.css"
import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import GetUserMenus from "../Product/GetUserMenus";
// import ProductServices from "../../services/ProductServices";
// import CustomerServices from "../../services/CustomerServices";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from 'moment';
import DeleteIcon from "@material-ui/icons/Delete";

import RestaurantIcon from "@material-ui/icons/Restaurant";
// import AgricultureIcon from '@mui/icons-material/Agriculture';
// import AgricultureIcon from '@material-ui/icons/Agriculture';
import KitchenIcon from '@material-ui/icons/Kitchen';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import AuthServices from "../../configurations/AuthServices";

// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Pagination from "@material-ui/lab/Pagination";
import { FormatListBulletedRounded } from "@material-ui/icons";

const authServices = new AuthServices();
const minDate = new Date(Date.now());
// const customerServices = new CustomerServices();

export default class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //

      fdata: new FormData(),
      OpenFeedback: false,
      SaveOrderId: 0,
      SaveMobileNumber: "",
      Message: "",
      NumberOfRecordPerPage: 6,
      PageNumber: 1,
      TotalPages: 0,
      TotalRecords: 0,
      OpenLoader: false,
      OpenSnackBar: false,
      ProductListFlag: true,
      SeedDetailsFlag: false,
      RequestGoodsFlag: false,
      MyOrder: false,
      seedOrderBuy: true,
      ProductList: [],
      MyOrderData: [],
      FarmerData: [],
      ProdtNameFlag: false,
      ProductPriceFlag: false,
      QuantityFlag: false,
      UnitFlag: false,
      MfgDateFlag: false,
      ProdtName: "",
      ProductPrice: "",
      Quantity: "",
      Unit: "",
      MfgDate: "",
      ExpDate: "",
      ExpDateFlag: false,
      ProductType: "",
      ProductTypeFlag: false,
      VehicalNeed: "",
      VehicalNameFlag: false,
      VehicalName: "",
      QuantityVehicle: "",
      QuantityVehicleFlag: false,
      NoOfDays: "",
      NoOfDaysFlag: false,
      TotalPrice: "",
      PriceVehicle: "",
      PriceVehicleFlag: false,
      OrderDateFlag: false,
      OrdernameFlag: false,
      OrderPriceFlag: false,
      OrderDate: "",
      Ordername: "",
      OrderPrice: "",
      OrderDetails: true,
      FromDate: "",
      Feedback: "",
      FromDateFlag: false,
      ToDate: "",
      ToDateFlag: false,
      TotalDays: "",
      TotalDaysFlag: false,
      BookedBy: "",
      BookedByFlag: false,
      FeedBackPage: false,
      paymentPage: true,
      PaymentModeSelect: "",
      FeedbackFlag: false,
      FeedBack: "",
      orderId: "",
      TiffinIDPlan: "",
      OpenCard: false,
      BordingPoint: "",
      BordingPointFlag: false,
      DroppingPoint: "",
      DroppingPointFlag: false,
      SaveSeedId: 0,
      SaveSeedPrice: 0,
      AllMyOrderList: [],
      requestedGoodsDetails: [],
      FeedBackDetails: [],
      AddressCustomer: "",
      QuantityFlag: false,
      PinCode: "",
      PinCodeFlag: false
    };
  }

  componentWillMount() {
    this.GetallProductList(this.state.PageNumber)

  }

  handlePluseIcon = () => {
    this.setState({
      OrderDetails: false
    })
  }

  handleChangesFeedback = (e) => {
    this.setState({
      Feedback: e.target.value
    })
  }





  GetallProductList = (CurrentPage) => {
    let UserId = localStorage.getItem("UserId")
    let data = {
      "page": CurrentPage,
      "size": 15
    }
    authServices
      .AllCustomerListUser(data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            ProductList: data.data.data.content,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }



  ////////////////////////////////////////////////////


  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  handlePaging = async (e, value) => {
    const { ProductListFlag, SeedDetailsFlag, RequestGoodsFlag, FeedbackFlag } = this.state
    console.log("Current Page : ", value);

    this.setState({
      PageNumber: value,
    });

    if (ProductListFlag) {
      await this.GetAllFarmerData(value);
    }
    if (SeedDetailsFlag) {
      await this.GetallProductList(value);
    }
    if (RequestGoodsFlag) {
      await this.getAllExporterDetails(this.state.PageNumber)
    }
  };


  SignOut = async () => {
    await localStorage.removeItem("token");
    this.props.history.push("/SignIn");
  };

  handledeleteAdmin = (id) => {
    authServices

      .DeleteOrderExporter(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data !== null) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllMyOrderList(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  handleProductDetete = (id) => {
    authServices

      .deleteFarmerOrder(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data !== null) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllFarmerData(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }



  //////////////////////////////////////////


 

  handleSeedDetailsFlag = () => {
    this.setState({
      ProductListFlag: false,
      ProductSellFlag: false,
      SeedDetailsFlag: true,
      FeedBackPage: false,
      MyOrder: false,
      RequestGoodsFlag: false
      // OpenCard: false,
    });
    this.GetallProductList(this.state.PageNumber)
  }

  handleMyOrder = () => {
    this.setState({
      ProductListFlag: false,
      SeedDetailsFlag: false,
      MyOrder: true,
      FeedBackPage: false,
      OpenCard: false,
      RequestGoodsFlag: false
    });
    this.GetAllMyOrderList(this.state.PageNumber)
  }

  handleFeedback = () => {
    this.setState({
      ProductListFlag: false,
      SeedDetailsFlag: false,
      MyOrder: false,
      FeedBackPage: true,
      RequestGoodsFlag: false


    });
    this.GetallFeedbackUser(this.state.PageNumber)
  }


  handleRequestgoodsFlag = () => {
    this.setState({
      ProductListFlag: false,
      ProductSellFlag: false,
      SeedDetailsFlag: false,
      MyOrder: false,
      RequestGoodsFlag: true
    })
    this.getAllExporterDetails(this.state.PageNumber)
  }
  ////////////////////////////////////////////////////



  handleSubmitAddress = (e) => {
    e.preventDefault()
    debugger


    this.isValidHandler()
    // let UserId = localStorage.getItem("UserId")
    let data = {
      "id": null,
      "address": this.state.Address.toString(),
      "area": this.state.SelectArea.toString().toUpperCase(),
      "pin": "string"
    }
    authServices
      .SaveAddressUser(data)
      .then((data) => {
        debugger
        console.log("data : ", data);
        if (data.data.success) {
          this.setState({

            Address: "",
            SelectArea: "",
            OpenSnackBar: true,
            Message: data.data.message

          })


        } else {
          console.log("Sign Up Failed");
          this.setState({ open: true, Message: data.message });
        }
      })
      .catch((error) => {
        console.log("error : ", error);
        this.setState({ open: true, Message: "Something Went Wrong" });
      });

  }


  handleInputChangeProductSell = (e) => {
    let val = e.target.value
    if (e.target.name === "ProdtName") {
      this.setState({
        ProdtName: e.target.value,
        ProdtNameFlag: false
      })
    }
    if (e.target.name === "ProductPrice") {
      this.setState({
        ProductPrice: e.target.value,
        ProductPriceFlag: false
      })
    }
    if (e.target.name === "Quantity") {
      this.setState({
        Quantity: e.target.value,
        QuantityFlag: false
      })
    }
    if (e.target.name === "Unit") {
      this.setState({
        Unit: e.target.value,
        UnitFlag: false
      })
    }
    if (e.target.name === "MfgDate") {
      this.setState({
        MfgDate: e.target.value,
        MfgDateFlag: false
      })
    }
    if (e.target.name === "ExpDate") {
      this.setState({
        ExpDate: e.target.value,
        ExpDateFlag: false
      })
    }


    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))

  }
  //////////////////////////////////////////////////////////////



  CheckValidationProductSell = () => {
    const { ProdtName, ProductPrice, Quantity, Unit, MfgDate, ExpDate, ProductType, VehicalNeed, VehicalName, QuantityVehicle, PriceVehicle, NoOfDays } = this.state
    console.log("CheckValidation Calling...");


    // this.setState({ EmailIDFlag: false, UnitFlag: false });

    if (ProdtName === "") {
      this.setState({
        ProdtNameFlag: true
      })
    }
    if (ProductPrice === "") {
      this.setState({
        ProductPriceFlag: true
      })
    }
    if (Quantity === "") {
      this.setState({
        QuantityFlag: true
      })
    }
    if (Unit === "") {
      this.setState({
        UnitFlag: true
      })
    }
    if (MfgDate === "") {
      this.setState({
        MfgDateFlag: true
      })
    }
    if (ExpDate === "") {
      this.setState({
        ExpDateFlag: true
      })
    }

  }

  handleProductOrderSubmit = (e) => {
    e.preventDefault()
    debugger
    let FarmerID = localStorage.getItem("FarmerID")
    this.CheckValidationProductSell()
    let fdataa = new FormData();

    fdataa.append("unit", parseInt(this.state.Unit));
    fdataa.append("userId", parseInt(FarmerID));
    fdataa.append("productType", "CROPS")
    fdataa.append("price", parseInt(this.state.ProductPrice))
    fdataa.append("quantity", parseInt(this.state.Quantity))
    fdataa.append("expDate", moment(this.state.ExpDate).format("YYYY/MM/DD").toString())
    fdataa.append("productImage", this.state.fdata)
    fdataa.append("productName", this.state.ProdtName)
    fdataa.append("mfgDate", moment(this.state.MfgDate).format("YYYY/MM/DD").toString())

    authServices

      .AddProductDetailsFarmer(fdataa)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.data !== null) {

          this.setState({
            ProdtName: "",
            Unit: "",
            ProductPrice: "",
            Quantity: "",
            ExpDate: "",
            fdata: "",
            MfgDate: "",
            OrderDetails: true,
            paymentPage: false,
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllFarmerData(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  ///////////////////////////////////////////////////////////////////

  handleInputBuyProduct = (e) => {
    if (e.target.name === "AddressCustomer") {
      this.setState({
        AddressCustomer: e.target.value,
        AddressCustomerFlag: false
      })
    }
    if (e.target.name === "PinCode") {
      this.setState({
        PinCode: e.target.value,
        PinCodeFlag: false
      })
    }


    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))

  }

  handleInputChangeVehicleData = (e) => {

    let val = e.target.value
    let name = e.target.name
    if (this.state.VehicalNeed === "Yes") {
      if (name === "VehicalName") {
        this.setState({
          VehicalName: val,
          VehicalNameFlag: false
        })
      }
      if (name === "QuantityVehicle") {
        this.setState({
          QuantityVehicle: val,
          QuantityVehicleFlag: false
        })
      }
      if (name === "NoOfDays") {
        this.setState({
          NoOfDays: val,
          NoOfDaysFlag: false
        })
      }
      if (name === "PriceVehicle") {
        this.setState({
          PriceVehicle: val,
          PriceVehicleFlag: false,
        })
      }
      if (name === "BordingPoint") {
        this.setState({
          BordingPoint: val,
          BordingPointFlag: false,
        })
      }
      if (name === "DroppingPoint") {
        this.setState({
          DroppingPoint: val,
          DroppingPointFlag: false,
        })
      }
    }

  }
  handleInputChangeVehicle = (e) => {
    this.setState({
      VehicalNeed: e.target.value
    })
  }

  handleSeedOrderDetails = (id, price) => {
    this.setState({
      seedOrderBuy: false,
      SaveSeedId: id,
      SaveSeedPrice: price
    })
  }

  CheckValidationProductBuySeed = () => {
    const { AddressCustomer, PinCode, VehicalNeed, VehicalName, QuantityVehicle, PriceVehicle, NoOfDays, BordingPoint, DroppingPoint } = this.state
    console.log("CheckValidation Calling...");

    if (AddressCustomer === "") {
      this.setState({
        AddressCustomerFlag: true
      })
    }
    if (PinCode === "") {
      this.setState({
        PinCodeFlag: true
      })
    }
   
  }

  handleIProductBuySubmit = (e) => {
    e.preventDefault();
    debugger
    let CustomerId = localStorage.getItem("CustomerId")
    this.CheckValidationProductBuySeed()

    let data = {

      "userId": parseInt(CustomerId),
      "productId": this.state.SaveSeedId,
      "paymentDetails": {
        "paymentMode": this.state.PaymentModeSelect,
        "paymentInfo": "string"
      },
      "address": this.state.AddressCustomer,
      "pinCode":this.state.PinCode
  }
    this.setState({ OpenLoader: true })
authServices
  .PlaceOrder(data)
  .then((data) => {

    this.setState({
      seedOrderBuy: true,
      FromDate: "",
      tiffinPlan: "",
      ToDate: "",
      TotalDays: "",
      BookedBy: "",
      OpenLoader: false,
      OpenSnackBar: true,
      Message: data.data.message,
      orderId: data.data.data.id
    })
    this.GetallProductList(this.state.PageNumber)
  })
  .catch((error) => {
    console.log("GetUserAppointments Error : ", error);
    this.setState({ OpenLoader: false });
  });


  }

handleInputChangePayment = (e) => {

  this.setState({
    [e.target.name]: e.target.value
  }, () => console.log("e.target.namepayment", e.target.value))
}

handleSubmitDetailsPaymentDetails = (e) => {
  if (this.state.PaymentModeSelect !== "")
    this.setState({
      OpenSnackBar: true,
      Message: "Payment Successful"
    })

}

//////////////////////////////////////////////////////////////////////

GetAllMyOrderList = (CurrentPage) => {
  let CustomerId = localStorage.getItem("CustomerId")
  let data = {
    "userId": parseInt(CustomerId),
    "page": CurrentPage,
    "size": 15
  }
  authServices
    .AllOrdersCustomer(data)
    .then((data) => {
      console.log("GetUserAppointments Data : ", data);
      // debugger
      if (data.data.data !== null) {

        this.setState({
          AllMyOrderList: data.data.data.content,

          OpenLoader: false,
        });
      }
    })
    .catch((error) => {
      console.log("GetUserAppointments Error : ", error);
      this.setState({ OpenLoader: false });
    });
}


getAllExporterDetails = (CurrentPage) => {
  let FarmerID = localStorage.getItem("FarmerID")
  let data = {
    "page": CurrentPage,
    "size": 15
  }
  authServices
    .getAllExporterDetails(data)
    .then((data) => {
      console.log("GetUserAppointments Data : ", data);
      // debugger
      if (data.data.data !== null) {

        this.setState({
          requestedGoodsDetails: data.data.data,

          OpenLoader: false,
        });
      }
    })
    .catch((error) => {
      console.log("GetUserAppointments Error : ", error);
      this.setState({ OpenLoader: false });
    });
}





handleOpenFeedbackModel = (id, mobile) => {
  this.setState({
    OpenFeedback: true,
    SaveOrderId: id,
    SaveMobileNumber: mobile
  });
};

InsertFeedback = () => {
  let FarmerID = localStorage.getItem("FarmerID")
  let data = {
    "userId": parseInt(FarmerID),
    "productId": parseInt(this.state.SaveOrderId),
    "mobileNumber": this.state.SaveMobileNumber,
    "rating": 5,
    "review": this.state.Feedback
  }
  authServices
    .InsertFeedback(data)
    .then((data) => {
      console.log("GetUserAppointments Data : ", data);
      // debugger
      if (data.data.data !== null) {

        this.setState({
          OpenFeedback: false,
          OpenSnackBar: true,
          Message: data.data.message,
          OpenLoader: false,

        });
      }
    })
    .catch((error) => {
      console.log("GetUserAppointments Error : ", error);
      this.setState({ OpenLoader: false });
    });

}


GetallFeedbackUser = (CurrentPage) => {
  let FarmerID = localStorage.getItem("FarmerID")
  let data = {
    "page": CurrentPage,
    "size": 15
  }
  authServices
    .GetallFeedbackUser(FarmerID, data)
    .then((data) => {
      console.log("GetUserAppointments Data : ", data);
      this.setState({
        FeedBackDetails: data.data.data.content
      })

    })
    .catch((error) => {
      console.log("GetUserAppointments Error : ", error);
      this.setState({ OpenLoader: false });
    });
}






CheckValidationMyOrder = () => {
  const { Ordername, OrderDate, OrderPrice } = this.state
  if (Ordername === "") {
    this.setState({
      OrdernameFlag: true
    })
  }
  if (OrderDate === "") {
    this.setState({
      OrderDateFlag: true
    })
  }
  if (OrderPrice === "") {
    this.setState({
      OrderPriceFlag: true
    })
  }

}
handleInputChangeMyorder = (e) => {

  let val = e.target.value
  if (e.target.name === "Ordername") {
    this.setState({
      Ordername: e.target.value,
      OrdernameFlag: false
    })
  }
  if (e.target.name === "OrderDate") {
    this.setState({
      OrderDate: e.target.value,
      OrderDateFlag: false
    })

  }
  if (e.target.name === "OrderPrice") {
    this.setState({
      OrderPrice: e.target.value,
      OrderPriceFlag: false
    })
  }
  this.setState({
    [e.target.name]: e.target.value
  }, () => console.log("e.target.name", e.target.value))
}



handleOrderDetailsPage = (e) => {
  const { FromDate, ToDate, TotalDays, BookedBy, TotalDaysFlag, BookedByFlag, ToDateFlag, FromDateFlag } = this.state;
  if (e.target.name === "FromDate") {
    this.setState({
      FromDate: e.target.value,
      FromDateFlag: false
    })
  }
  if (e.target.name === "ToDate") {
    this.setState({
      ToDate: e.target.value,
      ToDateFlag: false

    })
  }
  if (e.target.name === "TiifinPanId") {
    this.setState({
      TiifinPanId: e.target.value,
      TiifinPanIdFlag: false

    })
  }
  if (e.target.name === "TotalDays") {
    this.setState({
      TotalDays: e.target.value,
      TotalDaysFlag: false
    })
  }
  if (e.target.name === "BookedBy") {
    this.setState({
      BookedBy: e.target.value,
      BookedByFlag: false
    })
  }
  this.setState({
    [e.target.name]: e.target.value
  }, () => console.log("e.target.name", e.target.value))





}

CheckValidationOrderDetails = () => {
  const { FromDate, ToDate, TotalDays, BookedBy, TiifinPanId, TotalDaysFlag, BookedByFlag, ToDateFlag, FromDateFlag } = this.state;
  if (FromDate === "") {
    this.setState({
      FromDateFlag: true
    })
  }
  if (ToDate === "") {
    this.setState({
      ToDateFlag: true
    })
  }
  if (TiifinPanId === "") {
    this.setState({
      TiifinPanIdFlag: true
    })
  }

  if (TotalDays === "") {
    this.setState({
      TotalDaysFlag: true
    })
  }
  if (BookedBy === "") {
    this.setState({
      BookedByFlag: true
    })
  }

}

handleSubmitDetails = (e) => {

  e.preventDefault();
  debugger
  this.CheckValidationOrderDetails()
  let UserId = localStorage.getItem('UserId')
  var date1 = new Date(this.state.FromDate);
  var date2 = new Date(this.state.ToDate);
  var diffDays = date2.getDate() - date1.getDate();
  this.setState({
    TotalDays: diffDays
  })
  console.log("diddfff", diffDays)
  let data = {
    "tiffinPlanId": parseInt(this.state.TiffinIDPlan),
    "bookedBy": parseInt(UserId),
    "startFrom": moment(this.state.FromDate).format("YYYY-MM-DD").toString(),
    "endTo": moment(this.state.ToDate).format("YYYY-MM-DD").toString(),
    "numberOfDays": parseInt(diffDays)
  }
  this.setState({ OpenLoader: true })
  authServices
    .SaveOrders(data)
    .then((data) => {

      this.setState({
        // paymentPage: false,
        FromDate: "",
        tiffinPlan: "",
        ToDate: "",
        TotalDays: "",
        BookedBy: "",
        OpenLoader: false,
        OpenSnackBar: true,
        Message: data.data.message,
        orderId: data.data.data.id
      })

    })
    .catch((error) => {
      console.log("GetUserAppointments Error : ", error);
      this.setState({ OpenLoader: false });
    });



}




handleShowDetails = (id) => {
  this.setState({
    OrderDetails: false,
    TiffinIDPlan: id
  })

}



handleClose = () => {
  this.setState({ OpenFeedback: false });
};

disablePrevDates = (date) => {
  return date?.getDay() === 0;
}





filechangehandler = (e) => {
  console.log("filename", e.target.files)
  this.setState({
    fdata: e.target.files[0],
    forceUpdate: !this.state.forceUpdate
  })

}
pendingREquesthandle = (id) => {


  let FarmerID = localStorage.getItem("FarmerID")
  let data = {
    "isPending": false,
    "exportProductID": parseInt(id)
  }
  authServices
    .UpdateExporterStatus(data)
    .then((data) => {
      console.log("GetUserAppointments Data : ", data);
      this.setState({
        OpenSnackBar: true,
        Message: data.data.message
      })

      this.getAllExporterDetails(this.state.PageNumber)

    })
    .catch((error) => {
      console.log("GetUserAppointments Error : ", error);
      this.setState({ OpenLoader: false });
    });

}


render() {
  const { ProdtNameFlag, ProdtName, ProductPriceFlag, ProductPrice, Quantity, QuantityFlag, Unit, AddressCustomerFlag, AddressCustomer, PinCodeFlag, PinCode,
    seedOrderBuy, CardNumber, CardNumberFlag, CVVDetailsFlag, CVVDetails, ExpiryDateCardFlag, requestedGoodsDetails, ExpiryDateCard, ProductList, AllMyOrderList,
    UnitFlag, MfgDate, MfgDateFlag, ProductListFlag, FarmerData, ExpDate, ExpDateFlag, BordingPoint, BordingPointFlag, DroppingPoint, DroppingPointFlag,
    OpenSnackBar, Message, SeedDetailsFlag, MyOrder, RequestGoodsFlag, VehicalNeed, OrderDetails, VehicalNameFlag, VehicalName, QuantityVehicle, QuantityVehicleFlag, FeedBackDetails,
    NoOfDays, NoOfDaysFlag, TotalPrice, PriceVehicle, PriceVehicleFlag, FeedbackFlag, Feedback, FeedBackPage, PaymentModeSelect, paymentPage } = this.state
  return (
    <div className="UserDashBoard-Container">
      <div className="Sub-Container">
        <div className="Header">
          <AppBar position="static" style={{ backgroundColor: "#006b00" }}>
            <Toolbar>
              <Typography
                variant="h6"
                style={{
                  flexGrow: 3,
                  display: "flex",
                  padding: "5px 0 0 21px",
                  boxSizing: "border-box",
                  fontSize: "23px",
                  fontWeight: "bold"
                }}
              >
                GreenBee (Customer)

              </Typography>
              <div className="search" style={{ flexGrow: 0.5 }}>
                <div className="searchIcon">
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search "
                  classes={{
                    root: "inputRoot",
                    input: "inputInput",
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>

              <Button
                color="inherit"
                onClick={() => {
                  this.SignOut();
                }}
              >
                LogOut
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        <div className="Body">
          <div className="Sub-Body">
            <div className="SubBody11">

              <div
                className={ProductListFlag ? "NavButton1" : "NavButton2"}
                onClick={() => {
                  this.handleProductListFlag();
                }}
              >
                <div className="NavButtonText">Product Detials </div>
              </div>




              <div
                className={MyOrder ? "NavButton1" : "NavButton2"}
                onClick={() => {
                  this.handleMyOrder();
                }}
              >
                <div className="NavButtonText">My Orders</div>
              </div>

              <div
                className={FeedBackPage ? "NavButton1" : "NavButton2"}
                onClick={() => {
                  this.handleFeedback();
                }}
              >
                <div className="NavButtonText">FeedBack</div>
              </div>

            </div>
            <div className="SubBody22">
              <div className="bodyContent" >
                {ProductListFlag &&
                  <>
                    {seedOrderBuy ?
                      <div className="GetUserMenus-SubContainerAdmin">
                        <TableContainer component={Paper}>
                          <Table className="tableDeliveryboy" aria-label="simple table">

                            <>
                              <TableHead></TableHead>
                              <TableHead>
                                <TableRow>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Id
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Product Name
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Product Image
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Product Price
                                  </TableCell>

                                  <TableCell
                                    align="Left"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Product Details
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Product Company
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Product type
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Action
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                            </>

                            <TableBody>
                              {ProductList?.length > 0
                                ? ProductList.map((data, index) => {
                                  return (
                                    <TableRow >
                                      <>
                                        <TableCell align="Left" style={{ width: 200 }}>
                                          {data.productId}
                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 200 }}>
                                          {data.name}
                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 100 }}>
                                          <img className="bannerurl" src={data.imageUrl} alt="Girl in a jacket" />
                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 100 }}>
                                          {data.price}
                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 100 }}>
                                          {data.details}

                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 100 }}>
                                          {data.company}

                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 100 }}>
                                          {data.type}
                                        </TableCell>

                                        <TableCell align="Left" style={{ width: 100 }}>
                                          <div className="icons">
                                            <Button className="submitbtn1" size="small" onClick={() => this.handleSeedOrderDetails(data.productId, data.price)}>Order</Button>
                                            {/* <CreateIcon style={{ cursor: "pointer" }} onClick={()=>this.handleEditTiffin(data.id,data.planName,data.bannerUrl,data.pricePerDay,data.description)} /> */}
                                          </div>

                                        </TableCell>

                                      </>

                                      {/* )} */}
                                    </TableRow>
                                  );
                                })
                                : null}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div> :
                      
                        
                          <div className="plusContent">
                            <div className="plusContent_sub">
                              <div className="sportstitlePlus">Buyer Details</div>
                              <div>
                                <form className="form">
                                  <TextField

                                    className="TextField1"
                                    name="Customer Name"
                                    label="Customer Name"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    value={localStorage.getItem("firstName")}

                                  />
                                  <TextField

                                    className="TextField1"

                                    label="Email"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    value={localStorage.getItem("email")}

                                  />

                                  <TextField
                                  
                                    className="TextField1"
                                    name="AddressCustomer"
                                    label="Address"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={AddressCustomerFlag}
                                    value={AddressCustomer}
                                    onChange={(e) => this.handleInputBuyProduct(e)}
                                  />
                                  <TextField
                                    
                                    className="TextField1"
                                    name="PinCode"
                                    label="Unit"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={PinCodeFlag}
                                    value={PinCode}
                                    onChange={(e) => this.handleInputBuyProduct(e)}
                                  />

                                  <select className="TextField2"
                                    name="PaymentModeSelect"
                                    variant="outlined"
                                    size="small"
                                    id="PaymentModeSelect"
                                    style={{ margin: 20 }}
                                    // error={SportNameFlag}
                                    value={PaymentModeSelect}
                                    onChange={(e) => this.handleInputChangePayment(e)}
                                  >

                                    <option value="" disabled selected >Select Payment Mode</option>
                                    <option value="Debit"  >Debit</option>
                                    <option value="Credit"  >Credit</option>
                                    <option value="UPI"  >UPI</option>
                                    <option value="NetBanking"  >NetBanking</option>
                                    <option value="COD"  >COD</option>

                                  </select>




                                  <div className="buttons">
                                    <button className="submitbtn1"
                                      onClick={(e) => this.handleIProductBuySubmit(e)}
                                    >Submit</button>
                                    <button className="cancelbhn">Cancel</button>
                                  </div>

                                </form>
                              </div>
                            </div>


                          </div>

                       }
                  </>
                }

                {/* {SeedDetailsFlag &&
                    } */}



                {MyOrder &&
                  <>


                    <div className="GetUserMenus-SubContainer mt-3">
                      <TableContainer component={Paper}>
                        <Table className="" aria-label="simple table">
                          {/* {props.State === "UserHome" ? ( */}
                          <>
                            <TableHead></TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  align="center"
                                  style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                >
                                  Order ID
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                                >
                                  Product Name
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                >
                                  Order image
                                </TableCell>

                                <TableCell
                                  align="center"
                                  style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                >
                                  Price
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                >
                                  Address
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                >
                                 Payment Type
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                >
                                  Customer Name     
                                </TableCell>


                                <TableCell
                                  align="center"
                                  style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                >
                                  Actions
                                </TableCell>

                              </TableRow>
                            </TableHead>
                          </>
                          {/* ) : ( */}
                          <></>
                          {/* )} */}
                          <TableBody>
                            {AllMyOrderList.length > 0
                              ? AllMyOrderList.map((data, index) => {
                                return (
                                  <TableRow >
                                    {/* {props.State === "UserHome" ? ( */}
                                    <>
                                      <TableCell align="center" style={{ width: 200 }}>
                                        {data.orderId}

                                      </TableCell>
                                      <TableCell align="center" style={{ width: 200 }}>
                                        {data.product.name}

                                      </TableCell>
                                      <TableCell align="center" style={{ width: 100 }}>
                                        <img className="bannerurl" src={data.product.imageUrl} alt="Girl in a jacket" />

                                      </TableCell>
                                      <TableCell align="center" style={{ width: 100 }}>
                                        {data.product.price}
                                      </TableCell>
                                      <TableCell align="center" style={{ width: 100 }}>
                                        {data.address}
                                      </TableCell>
                                      <TableCell align="center" style={{ width: 100 }}>
                                        {data.payment.paymentMode}
                                      </TableCell>
                                      <TableCell align="center" style={{ width: 100 }}>
                                        {data.user.firstName}

                                      </TableCell>
                                     
                                      <TableCell align="center" style={{ width: 100 }}>
                                        {/* {data.bookedBy.email}123 */}
                                        <Button
                                          variant="outlined"
                                          className="submitbtn1"
                                          onClick={() => {
                                            this.handleOpenFeedbackModel(data.id, data.user.mobileNumber);
                                          }}
                                        >
                                          Feedback
                                        </Button>


                                        <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeleteAdmin(data.id)} />


                                      </TableCell>
                                      {/* <TableCell align="center" style={{ width: 100 }}>
                                          {data.totalPrice}1213132314
                                        </TableCell> */}

                                    </>
                                    {/* ) : ( */}
                                    <></>
                                    {/* )} */}
                                  </TableRow>
                                );
                              })
                              : null}
                          </TableBody>
                        </Table>
                      </TableContainer>


                    </div>

                    <Modal
                      open={this.state.OpenFeedback}
                      onClose={this.handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                      className="Model-Create-Feedback"
                    >
                      <Fade in={this.state.OpenFeedback}>
                        <div className="Model-Create-Feedback-Main">
                          <div className="Model-Create-Feedback-Header">
                            {/* <div className="Model-Create-Feedback-Header-Text"> */}
                            Send Your Feedback
                            {/* </div> */}
                          </div>
                          <div className="Model-Create-Feedback-Body">
                            <TextField
                              id="outlined-basic"
                              label="Feedback"
                              name="Feedback"
                              variant="outlined"
                              style={{ width: "100%" }}
                              multiline
                              rows={10}
                              size="small"
                              error={FeedbackFlag}
                              value={Feedback}
                              onChange={(e) => this.handleChangesFeedback(e)}
                            />
                          </div>
                          <div className="Model-Create-Feedback-Footer">
                            <Button
                              variant="contained"
                              style={{ margin: "10px" }}
                              onClick={() => {
                                this.handleClose();
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              // color="primary"
                              className="submitbtn1"
                              onClick={() => {
                                this.InsertFeedback();
                              }}
                            >
                              Send
                            </Button>
                          </div>
                        </div>
                      </Fade>
                    </Modal>

                    <Pagination
                      className="Pagination"
                      count={this.state.TotalPages}
                      Page={this.state.PageNumber}
                      onChange={(e) => this.handlePaging(e, this.state.TotalPages)}
                      variant="outlined"
                      shape="rounded"
                      color="secondary"
                    />
                  </>
                }

                {FeedBackPage &&
                  <>
                    <div className="GetUserMenus-SubContainerAdmin">
                      <TableContainer component={Paper}>
                        <Table className="tableDeliveryboy" aria-label="simple table">

                          <>
                            <TableHead></TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  align="Center"
                                  style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                >
                                  Id
                                </TableCell>
                                <TableCell
                                  align="Center"
                                  style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                >
                                  User Name
                                </TableCell>
                                <TableCell
                                  align="Center"
                                  style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                >
                                  Mobile Number
                                </TableCell>
                                <TableCell
                                  align="Center"
                                  style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                >
                                  Feedback
                                </TableCell>


                              </TableRow>
                            </TableHead>
                          </>

                          <TableBody>
                            {FeedBackDetails?.length > 0
                              ? FeedBackDetails.map((data, index) => {
                                return (
                                  <TableRow >

                                    <>
                                      <TableCell align="Center" style={{ width: 200 }}>
                                        {data.id}
                                      </TableCell>
                                      <TableCell align="Center" style={{ width: 200 }}>
                                        {data.user.firstName}
                                      </TableCell>
                                      <TableCell align="Center" style={{ width: 100 }}>
                                        {data.mobileNumber}
                                      </TableCell>

                                      <TableCell align="Center" style={{ width: 100 }}>
                                        {data.review}
                                      </TableCell>



                                    </>

                                    {/* )} */}
                                  </TableRow>
                                );
                              })
                              : null}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </>}

              </div>



            </div>

          </div>
        </div>

        <div className="FooterDiv">Footer</div>
      </div>
      <Backdrop
        style={{ zIndex: "1", color: "#fff" }}
        open={this.state.OpenLoader}
        onClick={() => {
          this.setState({ OpenLoader: false });
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={OpenSnackBar}
        autoHideDuration={2000}
        onClose={this.handleSnackBarClose}
        message={Message}
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={this.handleSnackBarClose}
            >
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={this.handleSnackBarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
}
