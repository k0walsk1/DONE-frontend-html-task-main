import { useState } from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";
import PropTypes, { func } from "prop-types";
import { Component } from "react";
import styled from "styled-components";

const routes = [
  { title: "Home", icon: "fas-solid fa-house", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

const Sidebar = (props) => {
  const { color } = props;
  const [isOpened, setIsOpened] = useState(false);
  const containerClassnames = classnames("sidebar", { opened: isOpened });

  const [dark, setDark] = useState(color === "dark");
  function switchThem() {
    setDark(!dark);
  }

  const goToRoute = (path) => {
    console.log(`going to "${path}"`);
  };

  const toggleSidebar = () => {
    setIsOpened((v) => !v);
  };

  return (
    <SidebarWrap
      className={containerClassnames}
      $dark={dark}
      $isOpened={isOpened}
    >
      <TopLogoSection>
        <ImageLogo src={logo} alt="TensorFlow logo" />
        <LogoTitle $dark={dark} $isOpened={isOpened}>
          TensorFlow
        </LogoTitle>
        <Toggle $isOpened={isOpened} $dark={dark} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isOpened ? "angle-left" : "angle-right"} />
        </Toggle>
      </TopLogoSection>

      <MidleNavSection>
        {routes.map((route) => (
          <NavItems
            $dark={dark}
            key={route.title}
            onClick={() => {
              goToRoute(route.path);
            }}
          >
            <FontAwesomeIcon icon={route.icon} />
            <NavItemsTitile $isOpened={isOpened}>{route.title}</NavItemsTitile>
          </NavItems>
        ))}
      </MidleNavSection>

      <BottomNavSection>
        <BtnSwitchThem $dark={dark} data-opened={dark} onClick={switchThem}>
          <FontAwesomeIcon icon={dark ? "moon" : "sun"} />
          <NavItemsTitile $isOpened={isOpened}>
            {dark ? "Dark" : "Ligth"}
          </NavItemsTitile>
        </BtnSwitchThem>
        {bottomRoutes.map((route) => (
          <NavItems
            $dark={dark}
            key={route.title}
            onClick={() => {
              goToRoute(route.path);
            }}
          >
            <FontAwesomeIcon icon={route.icon} />
            <NavItemsTitile $isOpened={isOpened}>{route.title}</NavItemsTitile>
          </NavItems>
        ))}
      </BottomNavSection>
    </SidebarWrap>
  );
};

Sidebar.propTypes = {
  color: PropTypes.string,
};

export default Sidebar;

const SidebarWrap = styled.div`
  position: fixed; 
  top: 0; 
  left: 0; 
  bottom: 0; 
  width: ${({ $isOpened }) => ($isOpened ? "50px" : "250px")};
  height: 100vh;
  background-color: ${({ $dark }) =>
    $dark
      ? "var(--color-sidebar-background-dark-default)"
      : "var(--color-sidebar-background-light-default)"};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 0px 20px 20px 0px;
`;

const TopLogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const LogoTitle = styled.span`
  color: ${({ $dark }) =>
    $dark
      ? "var(--color-text-logo-dark-default)"
      : "var(--color-text-logo-light-default)"};
  font-size: 25px;
  font-weight: bold;
  display: ${({ $isOpened }) => ($isOpened ? "none" : "block")};
  transition: all 0.3s ease;
`;

const Toggle = styled.div`
  margin-left: ${({ $isOpened }) => ($isOpened ? "25px" : "52px")};
  transition: all 0.3s ease;
  cursor: pointer;
  color: ${({ $dark }) =>
    $dark
      ? "var(--color-text-dark-default)"
      : "var(--color-text-light-default)"};
  background-color: ${({ $dark }) =>
    $dark
      ? "var(--color-button-background-dark-default)"
      : "var(--color-button-background-light-default)"};
  padding: 2.5px 10px;
  border-radius: 50%;

  &:hover {
    background-color: ${({ $dark }) => ($dark ? "#7978788b" : "#7978788b")};
    color: #fff;
  }
`;

const ImageLogo = styled.img`
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;
`;

const MidleNavSection = styled.div`
  flex: 0.9;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavItems = styled.div`
  color: ${({ $dark }) =>
    $dark
      ? "var(--color-text-dark-default)"
      : "var(--color-text-light-default)"};
  background-color: ${({ $dark }) =>
    $dark
      ? "var(--color-button-background-dark-default)"
      : "var(--color-button-background-light-default)"};
  border-radius: 15px;
  padding: 10px 17px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ $dark }) =>
      $dark ? "var(--color-text-dark-hover)" : "var(--color-text-light-hover)"};
    background-color: ${({ $dark }) =>
      $dark
        ? "var(--color-sidebar-background-dark-hover)"
        : "var(--color-sidebar-background-light-hover)"};
  }

  &:active {
    color: ${({ $dark }) =>
      $dark
        ? "var(--color-text-dark-active)"
        : "var(--color-text-light-active)"};
    background-color: ${({ $dark }) =>
      $dark
        ? "var(--color-button-background-dark-active)"
        : "var(--color-button-background-light-active)"};
  }
`;

const NavItemsTitile = styled.span`
  display: ${({ $isOpened }) => ($isOpened ? "none" : "block")};
  transition: all 0.3s ease;
`;

const BottomNavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid #333;
`;

const BtnSwitchThem = styled.button`
  background-color: ${({ $dark }) =>
    $dark
      ? "var(--color-button-background-dark-default)"
      : "var(--color-button-background-light-default)"};
  color: ${({ $dark }) =>
    $dark
      ? "var(--color-text-dark-default)"
      : "var(--color-text-light-default)"};
  border-radius: 25px;
  border: none;
  padding: 10px 17px;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $dark }) =>
      $dark
        ? "var(--color-button-background-dark-hover)"
        : "var(--color-button-background-light-hover)"};
  }

  &:active {
    background-color: ${({ $dark }) =>
      $dark
        ? "var(--color-button-background-dark-active)"
        : "var(--color-button-background-light-active)"};
  }
`;
