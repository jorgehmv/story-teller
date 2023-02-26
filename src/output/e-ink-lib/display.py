#!/usr/bin/python
# -*- coding:utf-8 -*-
import sys
import os
libdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'e-ink-lib', 'lib')
if os.path.exists(libdir):
    sys.path.append(libdir)

from lib import epd7in5_V2
import textwrap
from PIL import Image, ImageDraw, ImageFont
import re
import math

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)


text = sys.argv[1]
mode = sys.argv[2]
process_id = sys.argv[3]

try:
  epd = epd7in5_V2.EPD()
  epd.init()
  epd.Clear()

  width = 40
  font24 = ImageFont.truetype(os.path.join(libdir, 'Font.ttc'), 24)
  font35 = ImageFont.truetype(os.path.join(libdir, 'Font.ttc'), 35)

  font = font35 if mode == 'prompt' else font24
  y_pos = 300 if mode == 'prompt' else 30

  paragraphs = []
  if mode == 'story':
    re.sub('\\n\nn+', '\\n', text)
    paragraphs = text.split('\n')
  else:
    paragraphs = [text]

  Himage = Image.new('1', (epd.height, epd.width), 255)  # 255: clear the frame

  wrapper = textwrap.TextWrapper(width=width)
  draw = ImageDraw.Draw(Himage)
  for idx, paragraph in enumerate(paragraphs):
    if len(paragraph) == 0:
      continue

    text_wrapped = wrapper.fill(text=paragraph)
    paragraph_height = math.ceil(len(paragraph) / float(((width - 5)))) * 30
    new_y_pos = y_pos + paragraph_height

    if new_y_pos > 750:
      draw.text((280, 750), "Continúa...", font=font, fill=0)
      print(process_id + "_continue" + "\n".join(paragraphs[-(len(paragraphs) - idx):]))
      break

    draw.text((10,y_pos), text_wrapped, font=font, fill=0)
    y_pos = new_y_pos

  epd.display(epd.getbuffer(Himage))

  epd.sleep()

  print(process_id + "_success")

  sys.exit()
except IOError as e:
  print(process_id + "_failure")
  sys.exit()
except KeyboardInterrupt:
  # wake from sleep
  epd.init()
  epd.Clear() # clean for now, remove?
  epd7in5_V2.epdconfig.module_exit()
  print(False)
  sys.exit()

