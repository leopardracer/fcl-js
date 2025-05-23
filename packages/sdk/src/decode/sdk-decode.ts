import {config} from "@onflow/config"
import {decodeResponse} from "./decode"

export async function decode(response: any): Promise<any> {
  const decodersFromConfig = await config().where(/^decoder\./)
  const decoders = Object.entries(decodersFromConfig).map(
    ([pattern, xform]) => {
      pattern = `/${pattern.replace(/^decoder\./, "")}$/`
      return [pattern, xform]
    }
  )

  return decodeResponse(response, Object.fromEntries(decoders))
}
