import React, { Component } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import List, { ListItem, ListItemText } from "material-ui/List";
import dateFormat from "dateformat";
import UserAvatar from "../components/UserAvatar";
import { store } from "../store";
import WeekPicker from "../components/WeekPicker";

const Game = withRouter(
  class extends Component {
    render() {
      const { game } = this.props;

      return (
        <ListItem>
          <div style={{ width: "100%" }}>
            <ListItemText style={{ textAlign: "center" }}>
              <span>
                {dateFormat(
                  new Date(game.createdAt),
                  "dddd, mmmm dS, yyyy, hh:MM"
                )}
              </span>
            </ListItemText>
            <div style={{ display: "flex" }}>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                {game.redUsers.map(user => (
                  <UserAvatar key={user.id} user={user} />
                ))}
              </div>
              <ListItemText style={{ width: 100, textAlign: "center" }}>
                <span>{game.score}</span>
              </ListItemText>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-start"
                }}
              >
                {game.blueUsers.map(user => (
                  <UserAvatar key={user.id} user={user} />
                ))}
              </div>
            </div>
          </div>
        </ListItem>
      );
    }
  }
);

const Games = observer(
  class extends Component {
    componentWillMount() {
      store.loadGames(store.gamesWeekFilter);
    }

    updateGamesList(date) {
      store.applyGamesWeekFilter(date.toString());
      store.loadGames(date);
    }

    render() {
      return (
        <React.Fragment>
          <WeekPicker
            value={store.gamesWeekFilter}
            onChange={this.updateGamesList}
          />
          <List style={{ width: "100%" }}>
            {store.games.map(game => <Game key={game.id} game={game} />)}
          </List>
        </React.Fragment>
      );
    }
  }
);

export default Games;
