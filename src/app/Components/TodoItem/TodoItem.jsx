import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "./TodoItem.scss";
import { Form, ListGroup } from "react-bootstrap";
import cn from "classnames";

/**
 * todo implement here component which will show todo item
 * Component should contain checkbox text and trash icon for remove item
 *
 * This component should receive the following params
 * text -  name of task
 * id - id of task
 * checked - checked state of the task
 * onCheck - callback which should be called if the checkbox state was changed
 * onRemove - callback which should be called if the trash icon was called
 *
 * NOTE: need to pass task id into callbacks as param
 */
export default function TodoItem(props) {
  const labelClass = cn("label", {
    labelChecked: props.checked,
  });
  return (
    <div className='wrapper'>
      <ListGroup>
        <ListGroup.Item className='item_li'>
          <div className='pretty p-svg p-round p-bigger'>
            <Form.Check.Input
              className='checed'
              type={"checkbox"}
              onChange={() => {
                props.toggleChecked(props.id);
              }}
              checked={props.checked}
            />
            <div className='state'>
              <FontAwesomeIcon icon={faCheck} className='svg' />
              <Form.Check.Label className={labelClass}>
                {props.textTask}
              </Form.Check.Label>
            </div>
          </div>
          <div className='trash'>
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => {
                props.deleteTasks(props.id);
              }}
            />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  ); // todo implement component markup here
}
