import React, { Component } from 'react'
import { map, memoize, equals, pick } from 'ramda'
import PropTypes from 'prop-types'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
export type Updater<State> = (any) => (State) => State
export type Updaters<State> = { [string]: Updater<State> }
export type MakeInitialState<Config, Env, State> = (Config, Env) => State
export type Render<State> = (State, Updaters<State>) => any

type RAProps<Config, Env, State> = {
  config: Config,
  env: Env,
  makeInitialState: MakeInitialState<Config, Env, State>,
  updaters: Updaters<State>,
  render: Render<State>,
}

export default <Config, Env, State>({
  config,
  env,
  makeInitialState,
  updaters,
  render,
}: RAProps<Config, Env, State>) => {
  class App extends Component<void, State> {
    updaters: (any) => void

    getChildContext() {
      return {
        state: this.state,
        updaters: this.updaters,
      }
    }

    state = makeInitialState(config, env)
    updaters = map(
      (updater) => (...params) => {
        this.setState(updater(...params), () => {})
      },
      updaters,
    )

    render() {
      return render(this.state, this.updaters)
    }
  }

  App.childContextTypes = {
    state: PropTypes.object.isRequired,
    updaters: PropTypes.object.isRequired,
  }

  return App
}

const identity = (x) => x

export const connect = <ComponentProps>(_slicer, mapProps = identity) => (
  Component: ReactComponent<ComponentProps>,
) => {
  const slicer =
    typeof _slicer === 'undefined'
      ? identity
      : Array.isArray(_slicer) ? pick(_slicer) : _slicer
  class ConnectedComponent extends React.Component {
    state = slicer(this.context.state)

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return true
    }
    render() {
      return (
        <Component {...mapProps(slicer(this.context.state))} {...this.props} />
      )
    }
  }

  ConnectedComponent.contextTypes = {
    state: PropTypes.object.isRequired,
  }

  return ConnectedComponent
}

export const update = (_slicer) => (Component) => {
  const slicer =
    typeof _slicer === 'undefined'
      ? identity
      : Array.isArray(_slicer) ? pick(_slicer) : _slicer
  class UpdatableComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !equals(nextProps, this.props)
    }
    render() {
      return <Component {...slicer(this.context.updaters)} {...this.props} />
    }
  }

  UpdatableComponent.contextTypes = {
    updaters: PropTypes.object.isRequired,
  }

  return UpdatableComponent
}
