/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SettingsImport } from './routes/settings'
import { Route as SShortIdImport } from './routes/s.$shortId'

// Create Virtual Routes

const YoutubeSummarizerLazyImport = createFileRoute('/youtube-summarizer')()
const ShortenerLazyImport = createFileRoute('/shortener')()
const SelfHostedLazyImport = createFileRoute('/self-hosted')()
const PrevSitesLazyImport = createFileRoute('/prev-sites')()
const AboutWriterLazyImport = createFileRoute('/about-writer')()
const AboutGamerLazyImport = createFileRoute('/about-gamer')()
const AboutDeveloperLazyImport = createFileRoute('/about-developer')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const YoutubeSummarizerLazyRoute = YoutubeSummarizerLazyImport.update({
  path: '/youtube-summarizer',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/youtube-summarizer.lazy').then((d) => d.Route),
)

const ShortenerLazyRoute = ShortenerLazyImport.update({
  path: '/shortener',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/shortener.lazy').then((d) => d.Route))

const SelfHostedLazyRoute = SelfHostedLazyImport.update({
  path: '/self-hosted',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/self-hosted.lazy').then((d) => d.Route))

const PrevSitesLazyRoute = PrevSitesLazyImport.update({
  path: '/prev-sites',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/prev-sites.lazy').then((d) => d.Route))

const AboutWriterLazyRoute = AboutWriterLazyImport.update({
  path: '/about-writer',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about-writer.lazy').then((d) => d.Route))

const AboutGamerLazyRoute = AboutGamerLazyImport.update({
  path: '/about-gamer',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about-gamer.lazy').then((d) => d.Route))

const AboutDeveloperLazyRoute = AboutDeveloperLazyImport.update({
  path: '/about-developer',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/about-developer.lazy').then((d) => d.Route),
)

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const SettingsRoute = SettingsImport.update({
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const SShortIdRoute = SShortIdImport.update({
  path: '/s/$shortId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/about-developer': {
      id: '/about-developer'
      path: '/about-developer'
      fullPath: '/about-developer'
      preLoaderRoute: typeof AboutDeveloperLazyImport
      parentRoute: typeof rootRoute
    }
    '/about-gamer': {
      id: '/about-gamer'
      path: '/about-gamer'
      fullPath: '/about-gamer'
      preLoaderRoute: typeof AboutGamerLazyImport
      parentRoute: typeof rootRoute
    }
    '/about-writer': {
      id: '/about-writer'
      path: '/about-writer'
      fullPath: '/about-writer'
      preLoaderRoute: typeof AboutWriterLazyImport
      parentRoute: typeof rootRoute
    }
    '/prev-sites': {
      id: '/prev-sites'
      path: '/prev-sites'
      fullPath: '/prev-sites'
      preLoaderRoute: typeof PrevSitesLazyImport
      parentRoute: typeof rootRoute
    }
    '/self-hosted': {
      id: '/self-hosted'
      path: '/self-hosted'
      fullPath: '/self-hosted'
      preLoaderRoute: typeof SelfHostedLazyImport
      parentRoute: typeof rootRoute
    }
    '/shortener': {
      id: '/shortener'
      path: '/shortener'
      fullPath: '/shortener'
      preLoaderRoute: typeof ShortenerLazyImport
      parentRoute: typeof rootRoute
    }
    '/youtube-summarizer': {
      id: '/youtube-summarizer'
      path: '/youtube-summarizer'
      fullPath: '/youtube-summarizer'
      preLoaderRoute: typeof YoutubeSummarizerLazyImport
      parentRoute: typeof rootRoute
    }
    '/s/$shortId': {
      id: '/s/$shortId'
      path: '/s/$shortId'
      fullPath: '/s/$shortId'
      preLoaderRoute: typeof SShortIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  SettingsRoute,
  AboutLazyRoute,
  AboutDeveloperLazyRoute,
  AboutGamerLazyRoute,
  AboutWriterLazyRoute,
  PrevSitesLazyRoute,
  SelfHostedLazyRoute,
  ShortenerLazyRoute,
  YoutubeSummarizerLazyRoute,
  SShortIdRoute,
})

/* prettier-ignore-end */
