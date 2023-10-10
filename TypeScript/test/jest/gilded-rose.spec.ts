import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it('should test scenarious for goods', () => {
    const inputItems = [
      new Item('Other', 1, 1), //Quality decreases with sell in
      new Item('Other', 1, 0), //Quality never is negative
    ]
    const expectedItems = [
      new Item('Other', 0, 0),
      new Item('Other', 0, 0),
    ]
    const gildedRose = new GildedRose(inputItems);
    const items = gildedRose.updateQuality();
    expect(items).toStrictEqual(expectedItems);
  });


  it('should test exceptions for Aged brie', () => {
    const inputItems = [
      new Item('Aged Brie', 1, 0), //Quality increases with sell in
      new Item('Aged Brie', 1, 50), //Quality never is never more than 50
    ]
    const expectedItems = [
      new Item('Aged Brie', 0, 1),
      new Item('Aged Brie', 0, 50),
    ]
    const gildedRose = new GildedRose(inputItems);
    const items = gildedRose.updateQuality();
    expect(items).toStrictEqual(expectedItems);
  });

  it('should test exceptions for Sulfuras', () => {
    const inputItems = [
      new Item('Sulfuras, Hand of Ragnaros', 1, 80), //Quality/sell in never changes
    ]
    const expectedItems = [
      new Item('Sulfuras, Hand of Ragnaros', 1, 80),
    ]
    const gildedRose = new GildedRose(inputItems);
    const items = gildedRose.updateQuality();
    expect(items).toStrictEqual(expectedItems);
  });

  it('should test exceptions for Backstage passes', () => {
    const inputItems = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0), //Quality increases with sell in(10)
      new Item('Backstage passes to a TAFKAL80ETC concert', 8, 0), //Quality increases with sell in(less than 10)
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0), //Quality increases with sell in(5)
      new Item('Backstage passes to a TAFKAL80ETC concert', 3, 0), //Quality increases with sell in(less than 5)
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20), //Quality increases with sell in(less than 5)
      new Item('Backstage passes to a TAFKAL80ETC concert', 1, 50), //Quality never is never more than 50
    ]
    const expectedItems = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 9, 2),
      new Item('Backstage passes to a TAFKAL80ETC concert', 7, 2),
      new Item('Backstage passes to a TAFKAL80ETC concert', 4, 3),
      new Item('Backstage passes to a TAFKAL80ETC concert', 2, 3),
      new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0),
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50),
    ]
    const gildedRose = new GildedRose(inputItems);
    const items = gildedRose.updateQuality();
    expect(items).toStrictEqual(expectedItems);
  });

});
