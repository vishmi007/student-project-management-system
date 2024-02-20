import React, { useState, useRef } from "react";
import "./TagInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import Spinner from "react-bootstrap/esm/Spinner";

export default function TagInput({
  labelText,
  infoText,
  userRole,
  getUserList,
}) {
  const [userTagArray, setUserTagArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const allUsers = useRef([]);
  const [selectedTagIndex, setSelectedTagIndex] = useState(-1);
  const axiosPrivate = useAxiosPrivate();

  function addTag(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (
        trimmedValue !== "" &&
        checkUserExistsInFilteredList(trimmedValue) &&
        !isEmailAdded(trimmedValue)
      ) {
        setUserTagArray((prevTags) => [...prevTags, trimmedValue]);
        getUserList([...userTagArray, trimmedValue]);
        setInputValue("");
      }
    }
  }

  function addTagOnEntryClick(email) {
    if (isEmailAdded(email)) return;
    setUserTagArray((prevTags) => [...prevTags, email]);
    getUserList([...userTagArray, email]);
    setInputValue("");
  }

  function isEmailAdded(email) {
    if (userTagArray.includes(email)) return true;
    return false;
  }

  function checkUserExistsInFilteredList(userEmail) {
    let result = false;
    filteredUsers.forEach((user) => {
      if (user.email === userEmail) {
        result = true;
      }
    });
    return result;
  }

  function handleTagDeleteBtn(indexToRemove) {
    setUserTagArray((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove)
    );
    getUserList(userTagArray.filter((_, index) => index !== indexToRemove));
  }

  function handleBackspcaeDel(event) {
    if (event.key === "Backspace" && inputValue === "") {
      event.preventDefault();
      setUserTagArray((prevTags) => {
        const newTags = [...prevTags];
        newTags.pop();
        return newTags;
      });
      const newTags = [...userTagArray];
      newTags.pop();
      getUserList(newTags);
    }
  }

  function handleInput(userInput) {
    setInputValue(userInput);
  }

  function getSuggestedUsers(userInput) {
    if (!userInput && allUsers.current.length === 0) return;
    const filterUsers = allUsers.current.filter((user) => {
      return (
        userInput &&
        user &&
        user.email.toLowerCase().includes(userInput.toLowerCase())
      );
    });
    setFilteredUsers(filterUsers);
  }

  function handleChange(value) {
    handleInput(value);
    getSuggestedUsers(value);
  }

  // API Call
  async function fetchUserSearchList(userRole) {
    try {
      const res = await axiosPrivate.get(
        `/lecturer/projects/search/${userRole}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => fetchUserSearchList(userRole),
    queryKey: ["searchUsers", { userRole }],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  if (!isLoading && !isError) {
    allUsers.current = users;
  }

  return (
    <div className='mt-3'>
      <label className='pb-1'>{labelText}</label>
      <div className='tag-input-container'>
        <ul className='d-flex p-0 my-auto flex-wrap'>
          <span className='my-2 mx-2'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          {userTagArray.map((tag, index) => (
            <li key={index} className='tag-input-tag-item mx-2 mb-2 p-1 my-2'>
              {tag}
              <span
                className='tag-input-cross-btn mx-2 mb-2 p-1 my-2'
                onClick={() => handleTagDeleteBtn(index)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </li>
          ))}
          <input
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            onKeyUp={handleBackspcaeDel}
            onKeyDown={addTag}
            className='tag-input-search-field mx-2'
            placeholder='Search'
          />
        </ul>
      </div>
      {inputValue && (
        <div className='mt-1 d-flex flex-column tag-input-results-container'>
          {isLoading ? (
            <div className='p-3 d-flex justify-content-center align-items-center'>
              <Spinner animation='border' />
            </div>
          ) : isError ? (
            <div className='p-4 d-flex justify-content-center align-items-center'>
              <p className='mb-0'>
                We encountered an issue while trying to retrieve user
                suggestion.
              </p>
            </div>
          ) : (
            filteredUsers.map((user, index) => {
              return (
                <div
                  onClick={() => addTagOnEntryClick(user.email)}
                  onMouseEnter={() => setSelectedTagIndex(index)}
                  key={index}
                  className={`d-flex align-items-center tag-input-suggested-entry py-2 ps-2 ${
                    index === selectedTagIndex ||
                    (index === 0 && selectedTagIndex === -1)
                      ? "tag-input-suggested-entry-selected"
                      : ""
                  }`}
                >
                  <div className='tag-input-entry-icon'>{user.iconText}</div>
                  <p className='ms-2 my-0'>{user.email}</p>
                </div>
              );
            })
          )}
        </div>
      )}
      <p className='mt-2 tag-input-info-text'>{infoText}</p>
    </div>
  );
}
