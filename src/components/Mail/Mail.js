import { Checkbox } from "@material-ui/core";
import { Label, LabelOutlined, Star, StarBorder } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocalContect } from "../../context/context";
import { db } from "../../lib/firebase";
import "./styles.css";

const Mail = ({ data }, { key }) => {
  const [starred, setStarred] = useState(false);
  const [important, setImportant] = useState(false);

  const { currentUser } = useLocalContect();
  var i;
  const history = useHistory();

  const updateRead = () => {
    history.push(`/${data.id}`);

    if (data.read === false) {
      db.collection("RecivedMails")
        .doc(currentUser.email)
        .collection("mail")
        .doc(data.id)
        .update({
          ...data,
          read: true,
        });
    }
  };
  return (
    <div
      onClick={updateRead}
      className={`mail ${data.read === false && "mail--unread"}`}
      id={data.time.split("/")[1]}
    >
      <div className='mail__texts'>
        {/* //? Sender's name */}
        <p className='mail__text' id='sender'>
          {data.sender.split("@")[0]}
        </p>
        <p className='mail__text' id='reciever'>
         - {data.recipents.split("@")[0]}
        </p>
        <div className='mail__titleSubtitle'>
          <p className='mail__text' id='subject'>
            - {data.subject}
          </p>
          <p className='mail__text mail__body' id='body'>
            - {data.body}
          </p>
        </div>
        <p className='mail__text'> - {data.time}</p>
      </div>
    </div>
  );
};

export default Mail;
