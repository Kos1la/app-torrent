import Router, {Request, Response} from 'express';
import WebTorrent from 'webtorrent'

const router = Router();
const client = new WebTorrent()

let state = {
  progress:0,
  downloadSpeed:0,
  uploadSpeed:0,
  ratio:0,
}

let error: string;

client.on('error', (err:Error) => {
  console.error('err',err.message)
  error = err.message
})

client.on('torrent',()=> {
  console.log(client.progress)
  state = {
    progress:Math.round(client.progress *100),
    downloadSpeed:client.downloadSpeed,
    uploadSpeed:client.uploadSpeed,
    ratio:client.ratio,
  }
})

router.get('/add/:magnet', (req:Request,res:Response)=> {
  const magnet = req.params.magnet

  client.add(magnet, (torrent) => {
    const files = torrent.files.map(data => ({
      name: data.name,
      length:data.length,
      path: data.path,
      files: data.files,
    }))

    res.status(200).send(files)
    
  })
})

router.get('/stats', async (req: Request, res: Response) => {
  res.status(200).send({
    state
  })
})

export default router