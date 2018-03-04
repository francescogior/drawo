
import React, { Component } from "react";
import { map } from "ramda";

export type Updater<State> = any => State => State;
export type Updaters<State> = { [string]: Updater<State> };
export type MakeInitialState<Config, Env, State> = (Config, Env) => State;
export type Render<State> = (State, Updaters<State>) => any;

type RAProps<Config, Env, State> = {
  config: Config,
  env: Env,
  makeInitialState: MakeInitialState<Config, Env, State>,
  updaters: Updaters<State>,
  render: Render<State>
};

export default <Config, Env, State>({
  config,
  env,
  makeInitialState,
  updaters,
  render
}: RAProps<Config, Env, State>) =>
  class App extends Component<void, State> {
    updaters: any => void;

    state = makeInitialState(config, env);
    updaters = map(
      updater => (...params) => {
        this.setState(updater(...params));
      },
      updaters
    );

    render() {
      return render(this.state, this.updaters);
    }
  };
