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

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)

screen_mode = None

epd = epd7in5_V2.EPD()
epd.init()
epd.Clear()

try:
  text = sys.argv[1]
  mode = sys.argv[2]

  font24 = ImageFont.truetype(os.path.join(libdir, 'Font.ttc'), 24)
  font35 = ImageFont.truetype(os.path.join(libdir, 'Font.ttc'), 35)

  font = font35 if mode == 'prompt' else font24
  width = 40 # TODO: confirm
  y_pos = 300 if mode == 'prompt' else 30

  wrapper = textwrap.TextWrapper(width=width)
  text_wrapped = wrapper.fill(text=text)

  Himage = Image.new('1', (epd.height, epd.width), 255)  # 255: clear the frame
  draw = ImageDraw.Draw(Himage)
  draw.text((10,y_pos), text_wrapped, font=font, fill=0)

  epd.display(epd.getbuffer(Himage))

  epd.sleep()

  print(True)

  sys.exit()
except IOError as e:
  print(False)
  sys.exit()
except KeyboardInterrupt:
  # wake from sleep
  epd.init()
  epd.Clear() # clean for now, remove?
  epd7in5_V2.epdconfig.module_exit()
  print(False)
  sys.exit()

