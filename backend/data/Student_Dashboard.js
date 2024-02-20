/*
 * FILE: Student_Dashboard.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: DB abstraction layer for the student dashboard tasks
 * REFERENCE: None
 * LAST MOD: 15/09/2023
 */

// Database abstraction layer for retreiving user data
const { db } = require("../firebase/admin");
const KANBAN = "Kanban";

const getKanbandata = async (teamID) => {
  console.log(
    "Inside the get Kanban method from student dashboad data controller"
  );

  try {
    const collectionRef = db.collection("Kanban");
    const querySnapShot = await collectionRef.get();
    const kanbanDataArray = [];

    querySnapShot.forEach((documentSnapShot) => {
      const kanbanData = documentSnapShot.data();

      console.log(kanbanData);
      console.log(kanbanData.teamId);

      if (kanbanData.teamId === teamID) {
        kanbanDataArray.push(kanbanData);
      }
    });
    return { status: 200, data: kanbanDataArray };
  } catch (error) {
    console.log(error);
    return { status: 500, data: [] };
  }
};

const initializeKanban = async (kanban) => {
  console.log("Hit initilaize kanban database operation");

  if (!kanban) {
    return { status: 500, data: "No kanban object provided" };
  } else {
    try {
      const collectionRef = db.collection(KANBAN);
      const newDocumentRef = await collectionRef.add(kanban);
      return { status: 200, data: newDocumentRef.id };
    } catch (error) {
      console.log(error);
      return { status: 500, data: "Server side error occured" };
    }
  }
};

const getKanbanFromID = async (kanbanID) => {
  if (!kanbanID) {
    return { status: 500, data: "Server side error" };
  } else {
    try {
      const collectionRef = db.collection(KANBAN);
      const documentRef = await collectionRef.doc(kanbanID);
      const kanabanRef = await documentRef.get();

      return { status: 200, data: kanabanRef.data() };
    } catch (error) {
      console.log(error);
      return { status: 500, data: "server side error" };
    }
  }
};

const updateKanban = async (taskList, kanbanID) => {
  if (!taskList) {
    return { status: 500, data: "No task List given" };
  } else {
    try {
      const collectionRef = db.collection(KANBAN);
      const documentRef = collectionRef.doc(kanbanID);

      await documentRef.update({ task: taskList });

      const updatedKanban = (await documentRef.get()).data();

      return { status: 200, data: updatedKanban };
    } catch (error) {
      console.log(error);
      return { status: 500, data: "Server side error occured" };
    }
  }
};

module.exports = {
  getKanbandata,
  initializeKanban,
  getKanbanFromID,
  updateKanban,

};
