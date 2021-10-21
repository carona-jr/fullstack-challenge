import { PORT } from '../config/index'
import app from './app'

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})