import { Transmit } from '@adonisjs/transmit-client'
import { Host } from '../Config'

export const transmit = new Transmit({
  baseUrl: Host||'https://sublymus.com'
})       
