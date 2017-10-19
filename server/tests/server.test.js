console.log(process.env.NODE_ENV);
const expect = require('expect');
const request = require('supertest');
const {ObjectID}= require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo.js');
const {todos,populateTodos} = require('./seed/seed');
const {users,populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });

});

 describe('GET /todos',(done) => {
   it('should get all todos',(done) => {
    request(app)
        .get('/todos')
        .expect((res) => {
          expect(res.body.todos.length).toBe(2);    
        })
        .end(done);
   });
});

describe('GET /todos/:id',(done) => {
  it('should return todo id',(done) => {
   request(app) 
       .get(`/todos/${todos[0]._id.toHexString()}`)
       .expect(200)
       .expect((res) => {
         expect(res.body.todo.text).toBe(todos[0].text);    
       })
       .end(done);
  });
  it('should return 404 with invalid id',(done) => {
    request(app) 
        .get(`/todos/1234ABC`)
        .expect(404)
        .end(done);
   });
   it('should return 404 with todo not found',(done) => {
     var hexId = new ObjectID().toHexString();
    request(app) 
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
   });


});
describe('DELETE /todos/:id',(done) => {
  it('should remove a todo by id',(done) => {
    var hexId = todos[1]._id.toHexString();
   request(app) 
       .delete(`/todos/${hexId}`)
       .expect(200)
       .expect((res) => {
         expect(res.body.todo._id).toBe(hexId);    
       })
       .end((err,res) => {
         if (err){ return done(err); }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();  
        }).catch((e) => done(e));
        
       });
  });
  it('should return 404 with invalid id',(done) => {
    request(app) 
        .get(`/todos/1234ABC`)
        .expect(404)
        .end(done);
   });
   it('should return 404 if todo not found',(done) => {
     var hexId = new ObjectID().toHexString();
    request(app) 
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
   });


});
describe('PATCH /todos/:id',(done) => {

  it('should update todo ',(done) => {
    var hexId = todos[0]._id.toHexString();
    var post = { 
      text: 'Changed Text',
      completed: true
  }
 request(app)
        .patch(`/todos/${hexId}`)
        .send(post)
        .expect(200)
        .expect((res) => {
           expect(res.body.todo.text).toBe(post.text);
           expect(res.body.todo.completed).toBe(true);
           expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done)
  });
  it('should clear completedAt when todo is not completed',(done) => {
    var hexId = todos[1]._id.toHexString();
    var post = { 
      completed: false
  }
 request(app)
        .patch(`/todos/${hexId}`)
        .send(post)
        .expect(200)
        .expect((res) => {
           expect(res.body.todo.completed).toBe(false);
           expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
  });
  it('should return 404 incorrect ID',(done) => {
    var hexId = '12345ABCD';
    var post = { 
      completed: false
  }
 request(app)
        .patch(`/todos/${hexId}`)
        .send(null)
        .expect(404)
        .end(done);
  });
});