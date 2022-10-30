import { useEffect, useState } from "preact/hooks";
import { Subscription } from "rxjs";
import { Rgb } from "../../entities/entityTypes";
import { getInitialSettings } from "../../stateHandling/storeCreators/settingsStore";
import { subscribeToPalette } from "../../stateHandling/subscriptions";

export function usePalette(): [Rgb[]] {

  const { COLOR_PALETTE } = getInitialSettings();

  const [palette, setPalette] = useState(COLOR_PALETTE);

  useEffect(() => {
    const subscriptions: Subscription[] = [
      subscribeToPalette(palette => { setPalette(state => (palette ?? [])) })
    ];

    return () => { subscriptions.map(it => it.unsubscribe()) };
  }, []);

  return [palette]
}