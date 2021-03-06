import React, { Component } from "react";
import Button from "material-ui/Button";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import { observer } from "mobx-react";
import { observable } from "mobx";
import UserAvatar from "../components/UserAvatar";
import { store } from "../store";
import WeekPicker from "../components/WeekPicker";
import LeadersBar from "../components/LeadersBar";

const OF_ALL_TIME = 1;
const OF_THE_WEEK = 0;

const Leaders = observer(
  class extends Component {
    state = {
      currentTab: OF_THE_WEEK
    };

    componentWillMount() {
      store.loadStats(store.gamesWeekFilter);
    }

    updateLeadersList(date) {
      store.applyGamesWeekFilter(date.toString());
      store.loadStats(date);
    }

    onSwitchTab = value => {
      this.setState({ currentTab: value });
      value === OF_ALL_TIME
        ? store.loadStats()
        : store.loadStats(store.gamesWeekFilter);
    };

    @observable sortingProperty = "rating";

    render() {
      return (
        <React.Fragment>
          <LeadersBar
            onChange={this.onSwitchTab}
            value={this.state.currentTab}
          />
          {this.state.currentTab === OF_THE_WEEK && (
            <WeekPicker
              value={store.gamesWeekFilter}
              onChange={this.updateLeadersList}
            />
          )}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell />
                <TableCell style={{ width: "100%" }} />
                <TableCell numeric>
                  <Button
                    color={
                      this.sortingProperty === "games" ? "primary" : "default"
                    }
                    onClick={() => {
                      this.sortingProperty = "games";
                    }}
                  >
                    Games
                  </Button>
                </TableCell>
                <TableCell numeric>
                  <Button
                    color={
                      this.sortingProperty === "wins" ? "primary" : "default"
                    }
                    onClick={() => {
                      this.sortingProperty = "wins";
                    }}
                  >
                    Wins
                  </Button>
                </TableCell>
                <TableCell numeric>
                  <Button
                    color={
                      this.sortingProperty === "defeats" ? "primary" : "default"
                    }
                    onClick={() => {
                      this.sortingProperty = "defeats";
                    }}
                  >
                    Defeats
                  </Button>
                </TableCell>
                <TableCell numeric>
                  <Button
                    color={
                      this.sortingProperty === "goals" ? "primary" : "default"
                    }
                    onClick={() => {
                      this.sortingProperty = "goals";
                    }}
                  >
                    <nobr>Goals</nobr>
                  </Button>
                </TableCell>
                <TableCell numeric>
                  <Button
                    color={
                      this.sortingProperty === "rating" ? "primary" : "default"
                    }
                    onClick={() => {
                      this.sortingProperty = "rating";
                    }}
                  >
                    <nobr>Rating</nobr>
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.usersStats
                .sort(
                  (a, b) => b[this.sortingProperty] - a[this.sortingProperty]
                )
                .map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <UserAvatar user={user} />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell
                      numeric
                      style={{
                        fontSize: this.sortingProperty === "games" && 18
                      }}
                    >
                      {user.games}
                    </TableCell>
                    <TableCell
                      numeric
                      style={{
                        fontSize: this.sortingProperty === "wins" && 18
                      }}
                    >
                      {user.wins} ({user.winsPercent}%)
                    </TableCell>
                    <TableCell
                      numeric
                      style={{
                        fontSize: this.sortingProperty === "defeats" && 18
                      }}
                    >
                      {user.defeats} ({user.defeatsPercent}%)
                    </TableCell>
                    <TableCell
                      numeric
                      style={{
                        fontSize: this.sortingProperty === "goals" && 18
                      }}
                    >
                      {user.goals}
                    </TableCell>
                    <TableCell
                      numeric
                      style={{
                        fontSize: this.sortingProperty === "rating" && 18
                      }}
                    >
                      {user.rating}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </React.Fragment>
      );
    }
  }
);

export default Leaders;
