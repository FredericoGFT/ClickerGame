import { ScoreUnitsPipe } from './score-units.pipe';

describe('ScoreUnitsPipe', () => {
  it('create an instance', () => {
    const pipe = new ScoreUnitsPipe();
    expect(pipe).toBeTruthy();
  });

  it('k indicator should appear', () => {
    const pipe = new ScoreUnitsPipe();
    const result = pipe.transform(1000)
    expect(result.indexOf('k')).toBeGreaterThan(5);
  });

  it('m indicator should appear', () => {
    const pipe = new ScoreUnitsPipe();
    const result = pipe.transform(1000000)
    expect(result.indexOf('m')).toBeGreaterThan(8);
  });

  it('t indicator should appear', () => {
    const pipe = new ScoreUnitsPipe();
    const result = pipe.transform(1000000000)
    expect(result.indexOf('t')).toBeGreaterThan(12);
  });

  it('g indicator should appear', () => {
    const pipe = new ScoreUnitsPipe();
    const result = pipe.transform(1000000000000)
    expect(result.indexOf('g')).toBeGreaterThan(15);
  });

  it('p indicator should appear', () => {
    const pipe = new ScoreUnitsPipe();
    const result = pipe.transform(1000000000000000)
    expect(result.indexOf('p')).toBeGreaterThan(18);
  });
});
