"""
  Third Homework Assignment for the Pirple course Python is Easy

  - If statements
"""

def conditional(a, b, c):
  a = int(a)
  b = int(b)
  c = int(c)

  # This condition is overridden by the one after
  # if (a == b) and (b == c):
  #   return True
  if (a == b) or (a == c) or (b == c):
    return True
  elif (a != b) and (a != c) and (b != c):
    return False

# Tests
print(conditional(1,2,3))
print(conditional(1,1,3))
print(conditional(1,'1',1))