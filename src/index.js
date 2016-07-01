// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import ContainerPlugin from 'base/container_plugin'
import Events from 'base/events'

export default class Mixpanel extends ContainerPlugin {
  get name() { return 'mixpanel' }
  constructor(container) {
    super(container)
    if (this.container.options.mixpanel) {
      this.account = this.container.options.mixpanelToken //Mixpanel Token
      this.trackerName = (this.container.options.mixpanelTrackerName) ? this.container.options.mixpanelTrackerName + '.' : 'Clappr.'
      this.domainName = this.container.options.domainName
      this.currentHDState = undefined

      //this.embedScript() TODO: require this internally
/*
      this.account = this.container.options.gaAccount
      this.trackerName = (this.container.options.gaTrackerName) ? this.container.options.gaTrackerName + '.' : 'Clappr.'
      this.domainName = this.container.options.gaDomainName
      this.currentHDState = undefined
      this.embedScript()
*/
    }
  }

/*
  embedScript() {
    if (!window._gat) {
      var script = document.createElement('script')
      script.setAttribute('type', 'text/javascript')
      script.setAttribute('async', 'async')
      script.setAttribute('src', '//www.google-analytics.com/ga.js')
      script.onload = () => this.addEventListeners()
      document.body.appendChild(script)
    } else {
      this.addEventListeners()
    }
  }
*/

  addEventListeners() {
    if (this.container) {
      this.listenTo(this.container, Events.CONTAINER_READY, this.onReady)
      this.listenTo(this.container, Events.CONTAINER_PLAY, this.onPlay)
      this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop)
      this.listenTo(this.container, Events.CONTAINER_PAUSE, this.onPause)
      this.listenTo(this.container, Events.CONTAINER_ENDED, this.onEnded)
      this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering)
      this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferFull)
      this.listenTo(this.container, Events.CONTAINER_ENDED, this.onEnded)
      this.listenTo(this.container, Events.CONTAINER_ERROR, this.onError)
      this.listenTo(this.container, Events.CONTAINER_PLAYBACKSTATE, this.onPlaybackChanged)
      this.listenTo(this.container, Events.CONTAINER_VOLUME, (event) => this.onVolumeChanged(event))
      this.listenTo(this.container, Events.CONTAINER_SEEK, (event) => this.onSeek(event))
      this.listenTo(this.container, Events.CONTAINER_FULL_SCREEN, this.onFullscreen)
      this.listenTo(this.container, Events.CONTAINER_HIGHDEFINITIONUPDATE, this.onHD)
      this.listenTo(this.container, Events.CONTAINER_PLAYBACKDVRSTATECHANGED, this.onDVR)
    }

    //_gaq.push([this.trackerName + '_setAccount', this.account]) TODO: configure this internally
    /*if (this.domainName)
      _gaq.push([this.trackerName + '_setDomainName', this.domainName])
    }*/

/*
    _gaq.push([this.trackerName + '_setAccount', this.account])
    if (this.domainName)
      _gaq.push([this.trackerName + '_setDomainName', this.domainName])
    }
*/

  onReady(){
    this.track('Playback', {'name':.container.playback.name})
  }

  onPlay() {
    this.track('Play', {'source':.container.playback.src})
  }

  onStop() {
    this.track('Stop', {'source':.container.playback.src})
  }

  onEnded() {
    this.track('Ended', {'source':.container.playback.src})
  }

  onBuffering() {
    this.track('Buffering', {'source':.container.playback.src})
  }

  onBufferFull() {
    this.track('Bufferfull', {'source':.container.playback.src})
  }

  onError() {
    this.track('Error', {'source':.container.playback.src})
  }

  onHD(isHD) {
    var status = isHD ? 'ON': 'OFF'
    if (status !== this.currentHDState) {
      this.currentHDState = status
      this.track('HD - ' + status, {'source':.container.playback.src})
    }
  }

  onPlaybackChanged(playbackState) {
    if (playbackState.type !== null) {
      this.track('Playback Type - ' + playbackState.type, {'source':.container.playback.src})
    }
  }

  onDVR(dvrInUse) {
    var status = dvrInUse? 'ON': 'OFF'
    this.track('DVR - ' + status, {'source':.container.playback.src})
  }

  onPause() {
    this.track('Pause', {'source':.container.playback.src})
  }

  onSeek() {
    this.track('Seek', {'source':.container.playback.src})
  }

  onVolumeChanged() {
    this.track('Volume', {'source':.container.playback.src})
  }

  onFullscreen() {
    this.track('Fullscreen', {'source':.container.playback.src})
  }


  track(array) {
    //var res = [this.trackerName + '_trackEvent'].concat(array)
    mixpanel.track(res)
  }

}
