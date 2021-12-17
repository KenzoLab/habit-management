﻿import HamburguerMenu from "../../components/HamburguerMenu";
import {
  App,
  Container,
  Footer,
  Header,
  Cards,
  ButtonToday,
  ButtonWeek,
  ButtonMonth,
} from "./styles";
import HabitCard from "../../components/HabitCard";
import { useHabit } from "../../providers/Habits";
import { useAuth } from "../../providers/AuthProvider";
import { useEffect } from "react";
import BasicSpeedDial from "../../components/SpeedDialHabits";
import { useState } from "react";
import ModalHabits from "../../components/HabitModal";

import ModalGoals from "../../components/GoalsModal";
import ModalActivities from "../../components/ActivitiesModal";
import { FiSearch } from "react-icons/fi";

import { ContainerDash, ContSearch, InputSearch, BtnSearch } from "./styles";

function Dashboard() {
  const [openModalHabits, setOpenModalHabits] = useState(false);

  const [openModalGoals, setOpenModalGoals] = useState(false);
  const [openModalActivities, setOpenModalActivities] = useState(false);

  const [isFiltered, setIsFiltered] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const { listHabitsFunction, listHabits } = useHabit();
  const { token } = useAuth();

  const filtering = (period) => {
    if (!isFiltered || filter !== period) {
      setIsFiltered(true);
      setFilter(period);
    } else if (filter === period) {
      setIsFiltered(false);
      setFilter("");
    }
  };

  const handleModalHabits = () => {
    setOpenModalHabits(!openModalHabits);
  };

  useEffect(() => {
    const filteredHabits = listHabits.filter(
      (habit) => habit.frequency === filter,
    );
    setFilteredList([...filteredHabits]);
  }, [isFiltered, filter]);

  useEffect(() => {
    listHabitsFunction(token);
  }, []);

  return (
    <App>
      <HamburguerMenu />
      <Container>
        <Header>
          <section className="header-top">
            <h2>Dashboard</h2>
            <div className="header-search">
              <input
                placeholder="Search..."
                //onChange={(evt) setSearch(evt.target.value)}
              />
              {/*<button
              //onClick={() => addGroup()}
              >
                + add grupo
              </button>*/}
            </div>
          </section>

          <section className="header-bottom">
            <div id="blues">
              <ButtonToday onClick={() => filtering("Daily")} filter={filter}>
                Today
              </ButtonToday>
              <ButtonWeek onClick={() => filtering("Weekly")} filter={filter}>
                Week
              </ButtonWeek>
              <ButtonMonth onClick={() => filtering("Monthly")} filter={filter}>
                Month
              </ButtonMonth>
            </div>
          </section>
        </Header>
        <Cards>
          {isFiltered
            ? filteredList.map((habit, index) => (
                <HabitCard
                  key={index}
                  title={habit.title}
                  frequency={habit.frequency}
                  category={habit.category}
                  difficulty={habit.difficulty}
                  habitId={habit.id}
                />
              ))
            : listHabits.map((habit, index) => (
                <HabitCard
                  key={index}
                  title={habit.title}
                  frequency={habit.frequency}
                  category={habit.category}
                  difficulty={habit.difficulty}
                  habitId={habit.id}
                />
              ))}
        </Cards>
        <Footer>
          <BasicSpeedDial handleModal={handleModalHabits} />
          <ModalHabits open={openModalHabits} handle={handleModalHabits} />
        </Footer>
      </Container>
    </App>

    // const handleModalGoals = () => {
    //   setOpenModalGoals(!openModalGoals);
    // };
    // const handleModalActivities = () => {
    //   setOpenModalActivities(!openModalActivities);
    // };

    // return (
    //   <div>
    //     <h1>Dashboard </h1>
    //     <button onClick={handleModalHabits}>Modal Habits</button>
    //     <button onClick={handleModalGroups}>Modal Groups</button>
    //     <button onClick={handleModalGoals}>Modal Goals</button>
    //     <button onClick={handleModalActivities}>Modal Activities</button>
    //     <ModalHabits open={openModalHabits} handle={handleModalHabits} />
    //     <ModalGroups open={openModalGroups} handle={handleModalGroups} />
    //     <ModalGoals open={openModalGoals} handle={handleModalGoals} />
    //     <ModalActivities
    //       open={openModalActivities}
    //       handle={handleModalActivities}
    //     />
    //   </div>
    //
    // <div>
    //   <h1>Dashboard </h1>
    //   <button onClick={handleModalHabits}>Modal Habits</button>
    //   <button onClick={handleModalGroups}>Modal Groups</button>
    //   <button onClick={handleModalGoals}>Modal Goals</button>
    //   <button onClick={handleModalActivities}>Modal Activities</button>
    //   <ModalHabits open={openModalHabits} handle={handleModalHabits} />
    //   <ModalGroups open={openModalGroups} handle={handleModalGroups} />
    //   <ModalGoals
    //     open={openModalGoals}
    //     handle={handleModalGoals}
    //     idGroup={1267}
    //   />
    //   <ModalActivities
    //     open={openModalActivities}
    //     handle={handleModalActivities}
    //   />
    // </div>
    // <ContainerDash>
    //   <h1>Dashboard </h1>
    //   <button onClick={handleModalHabits}>Modal Habits</button>
    //   <button onClick={handleModalGroups}>Modal Groups</button>
    //   <button onClick={handleModalGoals}>Modal Goals</button>
    //   <button onClick={handleModalActivities}>Modal Activities</button>

    //   <ContSearch>
    //     <div>
    //       <BtnSearch>
    //         <FiSearch />
    //       </BtnSearch>
    //       <InputSearch type="text" placeholder="Type to Search..." />
    //     </div>
    //   </ContSearch>
    //   <ModalHabits open={openModalHabits} handle={handleModalHabits} />
    //   <ModalGroups open={openModalGroups} handle={handleModalGroups} />
    //   <ModalGoals
    //     open={openModalGoals}
    //     handle={handleModalGoals}
    //     idGroup={1267}
    //   />
    //   <ModalActivities
    //     open={openModalActivities}
    //     handle={handleModalActivities}
    //     idGroup={1267}
    //   />
    // </ContainerDash>
  );
}

// const Dashboard = () => {
//   //State Modal Window
//
//   const [openModalGoals, setOpenModalGoals] = useState(false);
//   const [openModalActivities, setOpenModalActivities] = useState(false);

//   //Handle Modal Window

//   const handleModalGoals = () => {
//     setOpenModalGoals(!openModalGoals);
//   };
//   const handleModalActivities = () => {
//     setOpenModalActivities(!openModalActivities);
//   };

//   return (
//     <div>
//       <h1>Dashboard </h1>
//       <button onClick={handleModalHabits}>Modal Habits</button>
//       <button onClick={handleModalGoals}>Modal Goals</button>
//       <button onClick={handleModalActivities}>Modal Activities</button>
//       <ModalHabits open={openModalHabits} handle={handleModalHabits} />
//       <ModalGoals open={openModalGoals} handle={handleModalGoals} />
//       <ModalActivities
//         open={openModalActivities}
//         handle={handleModalActivities}
//       />
//     </div>
//   );
// };

export default Dashboard;
