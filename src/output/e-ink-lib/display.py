#!/usr/bin/python
# -*- coding:utf-8 -*-
import sys
import os
libdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'lib')
if os.path.exists(libdir):
    sys.path.append(libdir)

import logging
from waveshare_epd import epd2in7
import textwrap
from PIL import Image, ImageDraw, ImageFont

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)

logging.basicConfig(level = logging.DEBUG)

screen_mode = None

logging.info("1. Instantiating epd")
epd = epd2in7.EPD()
logging.info("1. Initializing epd ")
epd.init()
logging.info("1. Clearing")
epd.Clear(0xFF)

def font_type(line_len):
  font24 = ImageFont.truetype(os.path.join(libdir, 'Font.ttc'), 24)
  font35 = ImageFont.truetype(os.path.join(libdir, 'Font.ttc'), 35)

  return font24 if line_len > 15 else font35

def vertical_position(line_len):
  return 10 if line_len > 50 else 30 if line_len > 20 else 50 if line_len > 15 else 70

def init_and_clear():
  logging.info("Initializing epd ")
  epd.init()
  logging.info("Clearing")
  epd.Clear(0xFF)

  return epd

def show_text(text, wrap = True):
  epd = init_and_clear()

  line_len = len(text)

  font = font_type(line_len)
  width = 30 # TODO: confirm
  y_pos = vertical_position(line_len)

  wrapper = textwrap.TextWrapper(width=width)
  text_wrapped = wrapper.fill(text=text) if wrap else text

  logging.info("Writing..{}".format(text_wrapped))
  Himage = Image.new('1', (epd.height, epd.width), 255)  # 255: clear the frame
  draw = ImageDraw.Draw(Himage)
  draw.text((10,y_pos), text_wrapped, font=font, fill=0)

  epd.display(epd.getbuffer(Himage))

#### SETUP
try:
  show_text("Testing\n\nTesting 2", False)
  epd.sleep()

except IOError as e:
  logging.info(e)
  sys.exit()
except KeyboardInterrupt:
  logging.info("ctrl + c:")
  # wake from sleep
  epd.init()
  epd.Clear(0xFF) # clean for now, remove?
  epd2in7.epdconfig.module_exit()
  sys.exit()

