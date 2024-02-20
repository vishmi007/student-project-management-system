import React, { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import "./Kanban.css";
import Column from "./Column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { SelectedProjectContext } from "../../context/student_dashboard_contexts/SelectedProjectContext";
import { useMutation } from "@tanstack/react-query";

function Kanban({ fetchendpoint }) {
  //VARIABLES AND CONSTANTS
  const fetchingEndPoint = fetchendpoint;
  const addNewCardEndPoint = "/student/add-new-task";
  const updateKanbanEndPoint = "/student/update-kanban"
  const { selectedProject } = useContext(SelectedProjectContext);

  const teamID = selectedProject?.teamNo;
  const projectID = selectedProject?.projectID;

  const useAxiosForGet = useAxiosPrivate();

  // STATES
  const [columns, setColumns] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");

  // DEFINED FUNCTIONS
  //function used to fetch data from the backend with user authentication
  const fetchData = async () => {
    try {
      const data = { teamID: teamID, projectID: projectID };
      const response = await useAxiosForGet.post(fetchingEndPoint, data);

      return response.data;

      // Process userData...
    } catch (error) {
      // Handle error
      throw error;
    }
  };

  const addNewTask = async (taskCard) => {
    try {
      const response = await useAxiosForGet.post(addNewCardEndPoint, taskCard);

      return response.data;

      // Process userData...
    } catch (error) {
      // Handle error
      throw error;
    }
  };

  const updateState = async (updatedColumns) => {
    try {
      const payload = {
        "change":updatedColumns,
        "teamNo":teamID,
        "projectID":projectID
      }
      const response = await useAxiosForGet.post(updateKanbanEndPoint,payload);

      return response.data;

      // Process userData...
    } catch (error) {
      // Handle error
      throw error;
    }
  };

  //on grag event function
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    // if we are moving between containers
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const updatedVal = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      }
      setColumns(updatedVal);

      const theChange = {
        "taskId":'',
        "newState":''
      }

      // set the id 
      theChange.taskId =removed.id ;
      //This is specifically desing for our case and hard coded
      if(destination.droppableId === "0"){

        theChange.newState = "to do"
      }else if(destination.droppableId === "1"){
     
        theChange.newState = "in progress"
      }else{
   
        theChange.newState = "done"
      }

      updateOnDrag.mutate(theChange);
      
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }

  


  };

  const { mutate } = useMutation({
    mutationFn: fetchData,

    onSuccess: (data, variables, contect) => {
      //TODO:Do anything aftre the mutation is success
     
      setColumns(data.data);
      // const lastEnrolledProject = data.enrolledProjects[data.enrolledProjects.length-1];
    },
    onError: (error, variables, context) => {
      //TODO:Do anything after the mutation is failed

      console.log(error.response.data.message);
    },
  });



  const addNewTaskMutation = useMutation({
    mutationFn: addNewTask,
    onSuccess:(data)=>{
      setColumns(data.data);
    },
    onError:()=>{
      console.log("Error while adding the new task");
    }
  });

  const updateOnDrag = useMutation({
    mutationFn:updateState,
    onSuccess:(data)=>{
      console.log(data)
    },
    onError:()=>{
      console.log("Error while updating the state");
    },
  });



  useEffect(() => {
      mutate();
  }, [selectedProject]);

  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleInputChangeP = (e) => {
    setPriority(e.target.value);
  };

  const handleInputChangeD = (e) => {
    setDescription(e.target.value);
  };

  const handleInputChangeC = (e) => {
    setComments(e.target.value);
  };

  const addItemToBackend = (taskName, priority, description, comments) => {
    const newCard = {
      taskName: taskName,
      priorityLevel: priority,
      description: description,
      comments: comments,
      teamID: teamID,
      projectID: projectID,
    };

  
    addNewTaskMutation.mutate(newCard);

  };

  return (
    <div>
      {/* Pop up to add a new task to the kanaban board */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <input
              type="text"
              placeholder="Enter task name"
              value={taskName}
              onChange={handleInputChange}
              className="popup-input"
            />
            <input
              type="text"
              placeholder="Enter Priority Level"
              value={priority}
              onChange={handleInputChangeP}
              className="popup-input"
            />
            <input
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={handleInputChangeD}
              className="popup-input"
            />
            <input
              type="text"
              placeholder="Enter Comments"
              value={comments}
              onChange={handleInputChangeC}
              className="popup-input"
            />

            <button
              onClick={() =>
                addItemToBackend(taskName, priority, description, comments)
              }
              className="popup-button"
            >
              Add Task
            </button>

            <button
              onClick={() => setShowPopup(false)}
              className="popup-button cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add button to add a new task */}
      <div>
        <button className="addbutton" onClick={() => setShowPopup(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      {/* Kanban compnent */}
      <div className="Kanban">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {/* Dynamic rendering of main column containers these columns are hte columsn that hold the column name not droppable contexts*/}
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Column key={columnId} columnId={columnId} column={column} />
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default Kanban;
