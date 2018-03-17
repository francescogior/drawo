// @flow
import React, { Component, type ComponentType } from 'react'
import { map, equals, pick } from 'ramda'
import PropTypes from 'prop-types'
import { identity } from '../../utils'

export type Updater<State> = any => State => State
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

export default function reactApp<Config, Env, State>({
  config,
  env,
  makeInitialState,
  updaters,
  render,
}: RAProps<Config, Env, State>) {
  class App extends Component<void, State> {
    updaters: any => void

    state = makeInitialState(config, env)

    getChildContext() {
      return {
        state: this.state,
        updaters: this.updaters,
      }
    }

    updaters = map(
      updater => (...params) => {
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

type SlicerFn<State> = State => $Rest<State, {}>
type SlicerLiteral<State> = $Keys<State>[]
type Slicer<State> = SlicerFn<State> | SlicerLiteral<State>

type MapProps<State, ComponentToConnectProps> = (
  $Rest<State, {}>,
) => $Rest<ComponentToConnectProps, {}>

export type Connect<State, ComponentProps> = (
  Slicer<State>,
  MapProps<State>,
) => (ComponentType<ComponentProps>) => ComponentType<{| ...ComponentProps, ...$Rest<State, {}> |}>

export const connect = <State, ComponentProps, ComponentToConnectProps>(
  _slicer: Slicer<State>,
  mapProps: MapProps<State, ComponentToConnectProps> = identity,
) => (ComponentToConnect: ComponentType<ComponentToConnectProps>): ComponentType<ComponentProps> => {
  const slicer =
    typeof _slicer === 'undefined' ? identity : Array.isArray(_slicer) ? pick(_slicer) : _slicer

  // eslint-disable-next-line react/no-multi-comp
  class ConnectedComponent extends React.Component<ComponentProps> {
    shouldComponentUpdate() {
      // nextProps: ComponentProps,
      // nextState: void,
      // nextContext: { state: State },
      return true // TODO obv
    }
    render() {
      return <ComponentToConnect {...mapProps(slicer(this.context.state))} {...this.props} />
    }
  }

  ConnectedComponent.contextTypes = {
    state: PropTypes.object.isRequired,
  }

  return ConnectedComponent
}

export const update = <Updaters, ComponentProps, ComponentToUpdateProps>(
  _slicer: Slicer<Updaters>,
) => (ComponentToUpdate: ComponentType<ComponentToUpdateProps>): ComponentType<ComponentProps> => {
  const slicer =
    typeof _slicer === 'undefined' ? identity : Array.isArray(_slicer) ? pick(_slicer) : _slicer

  // eslint-disable-next-line react/no-multi-comp
  class UpdatableComponent extends React.Component<ComponentProps> {
    shouldComponentUpdate() {
      // nextProps: ComponentProps,
      // nextState: void,
      // nextContext: { state: State },
      return true // TODO
    }

    render() {
      return <ComponentToUpdate {...slicer(this.context.updaters)} {...this.props} />
    }
  }

  UpdatableComponent.contextTypes = {
    updaters: PropTypes.object.isRequired,
  }

  return UpdatableComponent
}
