import { config } from "../config";
import { SettingsState } from "../settingTypes";
import Msgpack from 'msgpack-lite';
import { encode, decode } from 'base65536'

export function uniencode(obj) {
    return encode(Msgpack.encode(obj));
}

export function unidecode(str) {
    return Msgpack.decode(decode(str));
}


const getUrlSettings = (settings: string): SettingsState => {

  return unidecode(settings) as SettingsState
}


export const getInitialConfigObj = (): SettingsState => {
  let location = document.location.href
  let params = (new URL(location)).searchParams;
  let settings = params.get('settings');
  if (settings) {
    return getUrlSettings(settings);
  } else {
    return config;
  }
}


