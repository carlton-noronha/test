// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import BackButton from "./BackButton";
import Button from "./Button";
import styles from "./Form.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function Form() {
  const navigate = useNavigate();
  const { addCity, isLoading } = useCities();
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(() => {
    const fetchCity = async () => {
      try {
        setGeoCodingError("");
        setIsLoadingGeoCoding(true);
        const res = await fetch(
          `${BASE_URL}/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
        );
        const data = await res.json();
        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city. Please click somewhere else!"
          );
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        console.log("There was error loading data...");
        setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    };

    if (lat && lng) {
      fetchCity();
    }
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !date) {
      return;
    }

    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: { lat, lng },
    };

    await addCity(newCity);

    navigate('/app/cities');
  };

  if (!isLoadingGeoCoding && geoCodingError) {
    return <Message message={geoCodingError} />;
  }

  if (isLoadingGeoCoding && !geoCodingError) {
    return <Spinner />;
  }

  if (!isLoadingGeoCoding && !lat && !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  return (
    !geoCodingError &&
    !isLoadingGeoCoding && (
      <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="cityName">City name</label>
          <input
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
          <span className={styles.flag}>
            {flagemojiToPNG(emoji)}
          </span>
        </div>

        <div className={styles.row}>
          <label htmlFor="date">When did you go to {cityName}?</label>
          <DatePicker
            id="date"
            onChange={(date) => setDate(date)}
            selected={date}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="notes">Notes about your trip to {cityName}</label>
          <textarea
            id="notes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </div>

        <div className={styles.buttons}>
          <Button type="primary">Add</Button>
          <BackButton />
        </div>
      </form>
    )
  );
}

export default Form;
