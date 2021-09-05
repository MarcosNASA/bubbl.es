export const filterMatchingIdentifiers =
  (variables) =>
  ({ identifier: { start: referenceStart, end: referenceEnd } }) =>
    !variables.some(
      ({ identifier: { start: referenceStructureStart, end: referenceStructureEnd } }) =>
        referenceStructureStart === referenceStart && referenceStructureEnd === referenceEnd
    )
