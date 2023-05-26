import searchIcon from './assets/search.png'
import Dropdown from "./Components/Dropdown/Dropdown.component";
import chevDownIcon from './assets/chev-down.svg';
import {useContext, useEffect, useState} from "react";
import api from "./Helpers/api";
import { useNavigate } from "react-router-dom";
import {IsDarkContext} from "./App";
import {faArrowLeft, faChevronDown, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const List = () => {
  const classes= {
    listContainer: {
      width: "1440px",
      display: "flex",
      padding: "0 5%",
      marginTop: "60px",
      boxSizing: "border-box",
      flexDirection: "column",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
    },
    searchBar: {
      height: "60px",
      width: "380px",
      display: "flex",
      padding: "0 30px",
      borderRadius: "4px",
      alignItems: "center",
      backgroundColor: "var(--headerBg-hex)",
      boxShadow:"0px 1.3px 2.2px rgba(0, 0, 0, 0.02),0px 3.1px 5.3px rgba(0, 0, 0, 0.028),0px 5.8px 10px rgba(0, 0, 0, 0.035),0px 10.3px 17.9px rgba(0, 0, 0, 0.042),0px 19.2px 33.4px rgba(0, 0, 0, 0.05),0px 46px 80px rgba(0, 0, 0, 0.07)",
    },
    input: {
      border: "none",
      outline: "none",
      marginLeft: "20px",
      background: "transparent",
    },
    select: {
      border: "none",
      outline: "none",
      backgroundColor: "var(--headerBg-hex)",
    },
    list: {
      gap: "67px",
      display: "flex",
      flexWrap: "wrap",
    },
    listItems: {
      display: "flex",
      marginTop: "67px",
    },
    listItem: {
      display: "flex",
      width: "262px",
      cursor: "pointer",
      overflow: "hidden",
      borderRadius: "4px",
      marginBottom: "80px",
      flexDirection: "column",
      backgroundColor: "var(--headerBg-hex)",
      boxShadow:"0px 1.3px 2.2px rgba(0, 0, 0, 0.02),0px 3.1px 5.3px rgba(0, 0, 0, 0.028),0px 5.8px 10px rgba(0, 0, 0, 0.035),0px 10.3px 17.9px rgba(0, 0, 0, 0.042),0px 19.2px 33.4px rgba(0, 0, 0, 0.05),0px 46px 80px rgba(0, 0, 0, 0.07)",
    },
    flag: {
      maxHeight: "164px",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "20px 20px 40px 20px",
      color: "var(--text-hex)",
    },
    name: {
      fontWeight: "bold",
      marginBottom: "20px",
    },
    detail: {
      fontWeight: "400",
    },
    detailTitle: {
      fontWeight: "300",
    },
    text: {
      color: "var(--text-hex)"
    }
  }
  const [selectedFilter, setSelectedFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const { isDark, setIsDark } = useContext(IsDarkContext);

  const handleSelectFilter = (selectedFilter: String) => {
    setSelectedFilter(selectedFilter);
    getCountriesByRegion(selectedFilter);
  };
  const handleChangeInput = (event: any) => {
    if(event?.target?.value.length > 0) {
      getCountriesByName(event?.target?.value)
    } else if (event?.target?.value.length === 0){
      getCountries()
    }
  }

  const getCountries = async () => {
     const res = await api.get(`all`);
     if(res.data) {
       setCountries(res.data);
     }
  }

  const sortCountries = (sortType: string) => {
    switch (sortType) {
      case "populationD": {
        setCountries(countries.slice(0).sort((a, b) => b.population - a.population));
        break;
      }
      case "populationA": {
        setCountries(countries.slice(0).sort((a, b) => a.population - b.population));
        break;
      }
      case "countryNameD": {
        setCountries(countries.slice(0).sort(function (a, b) {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        }));
        break;
      }
      case "countryNameA": {
        setCountries(countries.slice(0).sort(function (b, a) {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        }));
        break;
      }
    }
  }

  useEffect(() => {
    console.log(countries)
  }, [countries])
  const getCountriesByRegion = async (regionName: string) => {
    const res = await api.get(`region/${regionName}`);
    if(res.data) {
      setCountries(res.data);
    }
  }

  const getCountriesByName = async (countryName: string) => {
    const res = await api.get(`name/${countryName}`);
    if(res.data) {
      setCountries(res.data);
    }
  }

  const handleNavigateDetails = (name: string) => {
    navigate(`/country/${name}`)
  }

  useEffect(() => {
    getCountries();
  }, [])

  return (
    <div className={"list-container"} style={classes.listContainer}>
      <div className={"topBar"} style={classes.topBar}>
        <div className={"searchBar"} style={classes.searchBar}>
          <FontAwesomeIcon icon={faSearch} style={classes.text}/>
          <input style={classes.input} onChange={handleChangeInput} placeholder="Search for a country ..."/>
        </div>
        <div>
          <Dropdown
            trigger={<div className="dropdown-trigger">{selectedFilter === "" ? "Filter by Region ..." : selectedFilter }
              <FontAwesomeIcon icon={faChevronDown} style={classes.text}/>
            </div>}
            menu={[
              <button style={classes.text} onClick={() => handleSelectFilter("Africa")}>Africa</button>,
              <button style={classes.text} onClick={() => handleSelectFilter("America")}>America</button>,
              <button style={classes.text} onClick={() => handleSelectFilter("Asia")}>Asia</button>,
              <button style={classes.text} onClick={() => handleSelectFilter("Europe")}>Europe</button>,
              <button style={classes.text} onClick={() => handleSelectFilter("Oceania")}>Oceania</button>,
            ]}
          />
        </div>
        <div>
          <Dropdown
            trigger={<div className="dropdown-trigger">{selectedFilter === "" ? "Sort By ..." : selectedFilter }
              <FontAwesomeIcon icon={faChevronDown} style={classes.text}/>
            </div>}
            menu={[
              <button style={classes.text} onClick={() => sortCountries("populationA")}>Population Ascending</button>,
              <button style={classes.text} onClick={() => sortCountries("populationD")}>Population Descending</button>,
              <button style={classes.text} onClick={() => sortCountries("countryNameA")}>Country Name Ascending</button>,
              <button style={classes.text} onClick={() => sortCountries("countryNameD")}>Country Name Descending</button>,
            ]}
          />
        </div>
      </div>
      <div style={classes.listItems}>
        <div style={classes.list} className={"list"}>
          {
           countries && countries.map((cnt, index) => (
              <div style={classes.listItem} className={"listItem"} key={index} onClick={() => handleNavigateDetails(cnt.name.common)}>
                <img style={classes.flag} src={cnt.flags.png} alt="flag"/>
                <div style={classes.details}>
                  <p style={classes.name}>{cnt.name.common}</p>
                  <p style={classes.detailTitle}><span style={classes.detail}>Population:</span> {cnt.population}</p>
                  <p style={classes.detailTitle}><span style={classes.detail}>Region:</span> {cnt.region}</p>
                  <p style={classes.detailTitle}><span style={classes.detail}>Capital:</span> {cnt.capital}</p>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}
export default List;