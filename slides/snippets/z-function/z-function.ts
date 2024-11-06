import z from 'zod';

const stringOrStringsParameterSchema = z
  .function()
  .args(z.string().or(z.array(z.string())))
  // .args(z.string().or(z.array(z.string().min(1))))
  .returns(z.array(z.string()));

type StringOrStringsParameter = z.input<typeof stringOrStringsParameterSchema>;

const getListOfStrings = stringOrStringsParameterSchema.implement((eitherStringOrStrings) => {
  if (typeof eitherStringOrStrings === 'string') {
    return [eitherStringOrStrings];
  }

  return eitherStringOrStrings;
});

getListOfStrings('meow');
getListOfStrings(['meow', 'woof']);
getListOfStrings([]);
getListOfStrings(true);
