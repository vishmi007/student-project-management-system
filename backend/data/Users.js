/*
 * FILE: Users.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: DB abstraction layer for the users collection.
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

// Database abstraction layer for retreiving user data
const { db } = require("../firebase/admin");

const getUser = async (email) => {
  const snapshot = await db.collection("Users").get();
  let userObj = {};

  snapshot.forEach((doc) => {
    if (doc.data().email === email) {
      userObj = doc.data();
    }
  });

  return userObj;
};


//Get a User by UUID
const getUserByUUID = async (uuid) => {
  try {
    const userDoc = await db.collection("Users").doc(uuid).get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(`Error fetching user information for UUID: ${uuid}`, error);
    throw error;
  }
};

const getUserByRefreshToken = async (refreshToken) => {
  const snapshot = await db.collection("Users").get();
  let userObj = {};

  snapshot.forEach((doc) => {
    if (doc.data().refreshToken === refreshToken) {
      userObj = doc.data();
    }
  });

  return userObj;
};

const getAllUsers = async () => {
  console.log("Hi i am being called")
  const snapshot = await db.collection("Users").get();
  const usersArray = [];

  snapshot.forEach((doc) => {
    usersArray.push({ id: doc.id, data: doc.data() });
  });
 

  return usersArray;
};

const getAllUserNamesWithDetails = async () => {
  try {
    const snapshot = await db.collection("Users").get();
    const userDetails = [];

    snapshot.forEach((doc) => {
      const userData = doc.data();
      const fullName = `${userData.firstName} ${userData.lastName}`;
      const userEmail = userData.email; // Include user's email
      const userRole = userData.role; // Include user's role

      userDetails.push({
        fullName,
        email: userEmail,
        role: userRole,
      });
    });

    return userDetails;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};


const addUser = async (uuid, userObj) => {
  await db.collection("Users").doc(uuid).set(userObj);
};

const updateUserDetails = async (email, updateDataObj) => {
  const snapshot = await db.collection("Users").get();
  let userDocID = "";

  snapshot.forEach((doc) => {
    if (doc.data().email === email) {
      return (userDocID = doc.id);
    }
  });

  const userDocRef = db.collection("Users").doc(userDocID);
  userDocRef.update(updateDataObj);
};

const checkUserExists = async (email) => {
  const snapshot = await db.collection("Users").get();
  let result = false;

  snapshot.forEach((doc) => {
    if (doc.data().email === email) {
      result = true;
    }
  });

  return result;
};

//project infomration data handling funtions
async function getProjectInfoData() {
  console.log("inside the get project infomation database query");
  const collectionRef = db.collection("Teams");
  const querySnapShot = await collectionRef.get();
  const projectInfoArray = [];

  querySnapShot.forEach((documentSnapShot) => {
    const data = documentSnapShot.data();
    projectInfoArray.push(data);
  });

  return projectInfoArray;
}

const getKanbandata = async () => {
  console.log("Inside the get Kanban method");
  const collectionRef = db.collection("Kanban");
  const querySnapShot = await collectionRef.get();
  const kanbanDataArray = [];

  querySnapShot.forEach((documentSnapShot) => {
    const kanbanData = documentSnapShot.data();
    kanbanDataArray.push(kanbanData);
  });

  return kanbanDataArray;
};

async function getUsersByRole(userRole) {
  if (!userRole) return;
  const query = db.collection("Users").where("role", "==", userRole);
  const data = await query.get();
  const users = data.docs.map((doc) => {
    return doc.data();
  });
  return users;
}

const setProjectList = async (uuid, projectList) => {
  if (!uuid || !projectList) {
    return {
      status: 500,
      response: "Erro in idetifing the uuid and projectList",
    };
  } else {
    try {
      const collectionRef = db.collection("Users");
      const documentRef = collectionRef.doc(uuid);
      const userRef = await documentRef.get();

      if (userRef.exists) {
        await documentRef.update({ projectsEnrolled: projectList });
        return { status: 200, response: projectList };
      } else {
        return { status: 404, response: "User does not exist" };
      }
    } catch (error) {
      console.error("Error while creating a new project list:", error);
      return { status: 500, response: "Server side error" };
    }
  }
};

const addNewProjectToEnroll = async (newJoinInfo, uuid) => {
  console.log("hit add new project to enroll");
  //check for input validity
  if (!newJoinInfo || !uuid) {
    return { status: 400, response: "No new project code or UUID detected" };
  } 
  else {

    try {
      const docRef = db.collection("Users").doc(uuid);
      const userRef = await docRef.get();
      if (userRef.exists) {
        const enrolledProjectList = userRef.data().projectsEnrolled;
        enrolledProjectList.push(newJoinInfo);
        
        await docRef.update({ projectsEnrolled: enrolledProjectList });
        return { status: 200, response: enrolledProjectList };
      } else {
        return { status: 404, response: "User does not exist" };
      }
    } catch (error) {
      console.log(error);
      return { status: 500, response: "Internal server error" };
    }
  }
};

const getUserProjectList = async (uuid) => {
  //if there is no uuid given
  //if there is no such user in the database
  //if the fetching is success

  // varibales and consts

  console.log("Hit the getProjectList Database controller");
  if (!uuid) {
    return { status: 400, message: "Error no UUID given" };
  } else {
    try {
      const collectionRef = db.collection("Users");
      const docRef = collectionRef.doc(uuid);
      const userRef = await docRef.get();

      if (userRef.exists) {

        //if the user has projects
        if(userRef.data()?.projectsEnrolled){

          const projectList = [];

          for(const joinInfo of userRef.data().projectsEnrolled){
            projectList.push(joinInfo.projectID);
          }

          // console.log(projectList);

          return { status: 200, message: projectList };
        }else{
          return { status: 200, message: [] };
        }
        
        //If the user has no projects enrolled
        
      } else {
        return { status: 400, message: "No such user" };
        
      }
    } catch (Error) {
      return {
        status: 500,
        message: "Error occured when fetching user projects",
      };
    }
  }
};


const getUserEnrollmentProjects = async(uuid)=>{

  console.log("Hit the db funtion" + uuid);

  try{  
    const collectionRef = db.collection("Users");
    const docRef = collectionRef.doc(uuid);
    const userRef = await docRef.get();

    if(userRef.data().hasOwnProperty("projectsEnrolled")){
      return{status:200,message:userRef.data().projectsEnrolled};
    }else{
      return{status:500,message:"No enrolled projects"};
    }

    
  }catch(error){
    return{status:500,message:"Iternal server error in the the get user enrolment proejcts db function"};
  }
  
  
}

module.exports = {
  getUser,
  getAllUsers,
  getUserByRefreshToken,
  addUser,
  checkUserExists,
  updateUserDetails,
  getProjectInfoData,
  getUserByUUID,
  getKanbandata,
  getUsersByRole,
  getUserByUUID,
  setProjectList,
  addNewProjectToEnroll,
  getAllUserNamesWithDetails,
  getUserProjectList,
  getUserEnrollmentProjects
};
