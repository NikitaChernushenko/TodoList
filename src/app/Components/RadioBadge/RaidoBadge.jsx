import "./RaidoBadge.scss";
import React, { useState } from "react";
import { Badge, Button } from "react-bootstrap";

/**
 * todo implement functional component which receive form parent
 * bages - array with names
 * onChange - callback function which should be called with the badge name
 * checked - name of the checked badge
 *
 * you can use more props if needed
 *
 * NOTE: this is component which show the ALL, TODO, Completed bages at the control panel
 *
 */
const RadioBadge = (props) => {
  const [badge, setBadge] = useState("All");
  return (
    <div className='wrapperRadio'>
      <div className='task'>
        <Badge variant='outline-light' onClick={props.checkAll}>
          {props.count} tasks left
        </Badge>
      </div>
      <div className='btnAll'>
        {props.controlBadges.map((el) => {
          return (
            <Button
              variant='Light'
              key={el}
              className={el === badge ? badge + "selected" : ""}
              onClick={() => {
                props.sortTasks(el);
                setBadge(el);
                console.log(badge);
              }}>
              {el}
            </Button>
          );
        })}
      </div>
      <div className='clear'>
        {props.completedLength !== 0 ? (
          <Badge variant='outline-light' onClick={props.clearCompleted}>
            Clear completed
          </Badge>
        ) : null}
      </div>
    </div>
  );
};

export default RadioBadge;
