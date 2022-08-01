import { useSelector } from "react-redux";
import { filterWindFarms } from "../../store/windfarms/selector";
import "./WindFarmsList.css";
import CircularColor from "../Loading/CircularColor";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { styled as styledMui } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const ListCard = styledMui("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const WindFarmsList = () => {
  const navigate = useNavigate();
  const windFarms = useSelector(filterWindFarms);

  if (windFarms.length === 0) {
    return <CircularColor />;
  }

  return (
    <div>
      <div>
        {windFarms?.length !== 0 && (
          <ListCard>
            <List
              dense={true}
              style={{
                position: "relative",
                overflow: "auto",
                maxHeight: 170,
              }}
            >
              {windFarms.map((wf) => (
                <ListItemButton onClick={() => navigate(`/${wf.p_name}`)}>
                  <ListItemText primary={wf.p_name} />
                </ListItemButton>
              ))}
            </List>
          </ListCard>
        )}
      </div>
    </div>
  );
};

export default WindFarmsList;
