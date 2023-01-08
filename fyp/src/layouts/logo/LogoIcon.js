import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/logo.ico";

const LogoIcon = ({width, height}) => {
  return (
    <Link href="/">
      <Image src={LogoDark} alt={LogoDark} width={width} height={height} />
    </Link>
  );
};

export default LogoIcon;
