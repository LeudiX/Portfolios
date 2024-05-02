class CodingLife {
    constructor() {
      this.currentState = 'SET_GOALS';
    }
  
    setGoals() {
      console.log('Setting goals...');
      this.currentState = 'PLAN';
    }
  
    plan() {
      console.log('Planning...');
      this.currentState = 'CODE';
    }
  
    code() {
      console.log('Coding...');
      this.currentState = 'TEST';
    }
  
    test() {
      console.log('Testing...');
      this.currentState = 'REFCTOR';
    }
  
    refactor() {
      console.log('Refactoring...');
      this.currentState = 'DEPLOY';
    }
  
    deploy() {
      console.log('Deploying...');
      this.currentState = 'MONITOR';
    }
  
    monitor() {
      console.log('Monitoring...');
      this.currentState = 'LEARN';
    }
  
    learn() {
      console.log('Learning...');
      this.currentState = 'SET_GOALS';
    }
  }
  
  const codingLife = new CodingLife();
  
  // Start the algorithm
  codingLife.setGoals();