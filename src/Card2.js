import React, { useState, useContext } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import { useData } from '../Apifatch';
import Dropdown from "../Dropdown/Dropdown";

import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const apiData = useContext(ApiContext); // Use the context to access data

  const { id, title, tag, userId, status, priority } = props.card;

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {tag?.map((item, index) => (
              <label key={index} style={{ backgroundColor: "#0079BF" }}>
                {item}
              </label>
            ))}
          </div>
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeCard(props.boardId, id)}>
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{title}</div>
        <div className="card_footer">
          {status && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              Status: {status}
            </p>
          )}
          {priority !== undefined && (
            <p className="card_footer_item">
              Priority: {priority}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;