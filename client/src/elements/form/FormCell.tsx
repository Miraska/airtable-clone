import { Input, Typography } from "@material-tailwind/react";
import { useTheme } from "../../hooks/useTheme/useTheme";

interface Props {
  label: string;
  value: string;
}

export default function FormCell({label, value}:Props) {
  const isDark = useTheme((store) => store.isDark)
  
  return (
    <div>
      <Typography variant="small">{ label }</Typography>
      <Input labelProps={{className: "hidden"}} color={isDark ? "white" : "black"} defaultValue={ value } />
    </div>
  )
}