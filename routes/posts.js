import  express from 'express';
import { getTodos , createTodo, updateTodo, deleteTodo} from '../controllers/posts.js';
 
const router = express.Router();
router.get('/' ,  getTodos );
router.post('/', createTodo);
router.patch('/:id', updateTodo)
router.delete('/:id' , deleteTodo)


export default  router;     
