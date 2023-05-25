import './App.css'
import arrowIcon from './assets/arrow.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import api from "./Helpers/api";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Details() {
  const [selectedCountry, setSelectedCountry] = useState<any>({});
  const [countryFullName, setCountryFullName] = useState<any>([]);
  const {countryName} = useParams();
  const navigate = useNavigate();
  const classes = {
    container: {
      width: "1440px",
      padding: "0 5%",
      display: "flex",
      marginTop: "60px",
      boxSizing: "border-box",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    back: {
      gap: "8px",
      width: "150px",
      height: "35px",
      display: "flex",
      cursor: "pointer",
      borderRadius: "4px",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--headerBg-hex)",
      boxShadow:"0px 1.3px 2.2px rgba(0, 0, 0, 0.02),0px 3.1px 5.3px rgba(0, 0, 0, 0.028),0px 5.8px 10px rgba(0, 0, 0, 0.035),0px 10.3px 17.9px rgba(0, 0, 0, 0.042),0px 19.2px 33.4px rgba(0, 0, 0, 0.05),0px 46px 80px rgba(0, 0, 0, 0.07)",
    },
    context: {
      width: "100%",
      display: "flex",
      marginTop: "40px",
      justifyContent: "space-between",
    },
    infos: {
      width: "43%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    infosList: {
      gap: "8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    bold: {
      fontWeight: "bold",
      marginBottom: "28px",
    },
    title: {
      fontWeight: "bold",
    },
    columns: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    border: {
      gap: "16px",
      display: "flex",
      flexWrap: "wrap",
      marginTop: "48px",
      alignItems: "center",
    }
  }

  const getCountryByFullName = async (countryName: string) => {
    const res = await api.get(`name/${countryName}?fullText=true`);
    if(res.data) {
      setSelectedCountry(res.data[0]);
      if(res.data[0]?.borders && res.data[0].borders.length > 0){
        res.data[0]?.borders.map(brdr => {
          getCountriesByName(brdr);
        })
      }
    }
  }

  const getCountriesByName = async (countryName: string) => {
    const res = await api.get(`alpha/${countryName}`);
    if(res.data) {
      setCountryFullName((prevState) => [...prevState, res.data[0]?.name?.common])
    }
  }

  useEffect(() => {
    getCountryByFullName(countryName);
    setCountryFullName([])
  }, [countryName])

  const handleClickBack = () => {
    navigate("/");
  }
  const handleClickBorderCountry = (name: string) => {
    navigate(`/country/${name}`)
  }

  return (
    <div className={"container"} style={classes.container}>
      <div style={classes.back} onClick={handleClickBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Back</p>
      </div>
      <div style={classes.context} className={"context"}>
        <img src={selectedCountry?.flags?.png} alt="flag" width="42%" />
        <div style={classes.infos} className={"infos"}>
          <h2 style={classes.bold}>{selectedCountry?.name?.common}</h2>
          <div style={classes.columns} className={"infos-list"}>
            <div style={classes.infos} className={"infos"}>
              <ul style={classes.infosList}>
                <li><p><span style={classes.title}>Native Name: </span>{selectedCountry?.name?.nativeName && Object.values(selectedCountry?.name?.nativeName)[0]?.common}</p></li>
                <li><p><span style={classes.title}>Population: </span>{selectedCountry?.population}</p></li>
                <li><p><span style={classes.title}>Region: </span>{selectedCountry?.region}</p></li>
                <li><p><span style={classes.title}>Sub Region: </span>{selectedCountry?.subregion}</p></li>
                <li><p><span style={classes.title}>Capital: </span>{selectedCountry?.capital}</p></li>
              </ul>
            </div>
            <div style={classes.infos} className={"infos"}>
              <ul style={classes.infosList} >
                <li><p><span style={classes.title}>Top Level Domain: </span>{selectedCountry?.tld}</p></li>
                <li><p><span style={classes.title}>Currencies: </span>{selectedCountry?.currencies && Object.values(selectedCountry?.currencies)[0]?.name}</p></li>
                <li><p style={{display: "flex", flexWrap: 'wrap'}}><span style={classes.title}>languages: </span>{selectedCountry?.languages && Object.values(selectedCountry?.languages).join(', ')}</p></li>
              </ul>
            </div>
          </div>
          <div style={classes.border}>
            <p style={classes.title}>Border Countries:</p>
            {countryFullName && countryFullName.map((nam, index) => index < selectedCountry?.borders.length && (
              <div style={classes.back} onClick={() => handleClickBorderCountry(nam)}>
                <p>{nam}</p>
              </div>
            )) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;
